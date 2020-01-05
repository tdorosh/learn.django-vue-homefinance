from decimal import Decimal

from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from accounting.pagination import Unpaginated
from accounting.permissions import IsOwner
from accounting import models
from accounting import serializers
from accounting import filters


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all()
    permission_classes = [IsAuthenticated, IsOwner]
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.TransactionFilterSet
    search_fields = ['notes',]
    serializer_class = serializers.TransactionSerializer
    serializer_action_class = {
        'list': serializers.RetrieveTransactionSerializer,
    }

    def get_serializer_class(self):
        try:
            return self.serializer_action_class[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()

    def get_queryset(self):
        return models.Transaction.objects.filter(owner=self.request.user).order_by('create_datetime')
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


    def create(self, request):
        amount = Decimal(request.data['amount'])
        currency = request.data['currency']
        trans_type = request.data['trans_type']
        if trans_type == 'INC':
            on_account = models.Account.objects.get(pk=request.data['on_account'])
            try:
                on_account.increase(amount, currency)
            except Exception as error:
                return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            else:
                on_account.save()
        if trans_type == 'EXP':
            from_account = models.Account.objects.get(pk=request.data['from_account'])
            try:
                from_account.decrease(amount, currency)
            except Exception as error:
                return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            else:
                from_account.save()
        if trans_type == 'TEC':
            from_account = models.Account.objects.get(pk=request.data['from_account'])
            on_account = models.Account.objects.get(pk=request.data['on_account'])
            try:
                from_account.decrease(amount, currency)
            except Exception as error:
                return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    on_account.increase(amount, currency)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
                else:
                    from_account.save()
                    on_account.save()
        
        return super().create(request)

    def update(self, request, pk=None):
        transaction = models.Transaction.objects.get(pk=pk)
        request_amount = Decimal(request.data['amount'])
        request_currency = request.data['currency']

        if transaction.from_account and request.data['from_account']:
            transaction_from_account = models.Account.objects.get(pk=transaction.from_account.id)
            request_from_account = models.Account.objects.get(pk=request.data['from_account'])

            if transaction_from_account.id == request_from_account.id:
                amount_diff = request_amount - transaction.amount
                try:
                    request_from_account.decrease(amount_diff, request_currency)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    transaction_from_account.increase(transaction.amount, transaction.currency.id)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
                try:
                    request_from_account.decrease(request_amount, request_currency)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)

        else:
            if transaction.from_account:
                transaction_from_account = models.Account.objects.get(pk=transaction.from_account.id)
                try:
                    transaction_from_account.increase(transaction.amount, transaction.currency.id)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            if request.data['from_account']:
                request_from_account = models.Account.objects.get(pk=request.data['from_account'])
                try:
                    request_from_account.decrease(request_amount, request_currency)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
        
        if transaction.on_account and request.data['on_account']:
            transaction_on_account = models.Account.objects.get(pk=transaction.on_account.id)
            request_on_account = models.Account.objects.get(pk=request.data['on_account'])

            if transaction_on_account.id == request_on_account.id:
                amount_diff = request_amount - transaction.amount
                try:
                    request_on_account.increase(amount_diff, request_currency)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    transaction_on_account.decrease(transaction.amount, transaction.currency.id)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
                try:
                    request_on_account.increase(request_amount, request_currency)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)

        else:
            if transaction.on_account:
                transaction_on_account = models.Account.objects.get(pk=transaction.on_account.id)
                try:
                    transaction_on_account.decrease(transaction.amount, transaction.currency.id)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            if request.data['on_account']:
                request_on_account = models.Account.objects.get(pk=request.data['on_account'])
                try:
                    request_on_account.increase(request_amount, request_currency)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)

        if transaction.from_account:
            transaction_from_account.save()

        if transaction.on_account:
            transaction_on_account.save()

        if request.data['from_account']:
            request_from_account.save()

        if request.data['on_account']:
            request_on_account.save()

        return super().update(request, pk=None)


    
    def destroy(self, request, pk=None):
        instance = self.get_object()
        if instance.trans_type == 'INC':
            on_account = models.Account.objects.get(pk=instance.on_account.id)
            try:
                on_account.decrease(instance.amount, instance.currency.id)
            except Exception as error:
                return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            else:
                on_account.save()
        if instance.trans_type == 'EXP':
            from_account = models.Account.objects.get(pk=instance.from_account.id)
            try:
                from_account.increase(instance.amount, instance.currency.id)
            except Exception as error:
                return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            else:
                from_account.save()
        if instance.trans_type == 'TEC':
            on_account = models.Account.objects.get(pk=instance.on_account.id)
            from_account = models.Account.objects.get(pk=instance.from_account.id)
            try:
                on_account.decrease(instance.amount, instance.currency.id)
            except Exception as error:
                return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    from_account.increase(instance.amount, instance.currency.id)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
                else:
                    from_account.save()
                    on_account.save()
        
        return super().destroy(request, pk=None)

class AccountViewSet(viewsets.ModelViewSet):
    queryset = models.Account.objects.all()
    permission_classes = [IsAuthenticated, IsOwner]
    pagination_class = Unpaginated
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.AccountFilterSet
    search_fields = ['title',]
    serializer_class = serializers.AccountSerializer
    serializer_action_class = {
        'list': serializers.RetrieveAccountSerializer,
    }

    def get_serializer_class(self):
        try:
            return self.serializer_action_class[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()

    def get_queryset(self):
        return models.Account.objects.filter(owner=self.request.user).order_by('amount')
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class AccountJournalListView(generics.ListAPIView):
    queryset = models.AccountJournal.objects.all()
    permission_classes = [IsAuthenticated, IsOwner]
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.AccountJournalFilterSet
    serializer_class = serializers.AccountJournalSerializer

    def get_queryset(self):
        return models.AccountJournal.objects.filter(owner=self.request.user).order_by('timestamp')

class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = models.Currency.objects.all()
    permission_classes = [IsAuthenticated, IsOwner]
    pagination_class = Unpaginated
    serializer_class = serializers.CurrencySerializer

    def get_queryset(self):
        return models.Currency.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    permission_classes = [IsAuthenticated, IsOwner]
    pagination_class = Unpaginated
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.CategoryFilterSet
    search_fields = ['name',]
    serializer_class = serializers.CategorySerializer

    def get_queryset(self):
        return models.Category.objects.filter(owner=self.request.user).order_by('name')
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Subcategory.objects.all()
    permission_classes = [IsAuthenticated, IsOwner]
    pagination_class = Unpaginated
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.SubcategoryFilterSet
    search_fields = ['name',]
    serializer_class = serializers.SubcategorySerializer
    serializer_action_class = {
        'list': serializers.RetrieveSubcategorySerializer,
    }

    def get_serializer_class(self):
        try:
            return self.serializer_action_class[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()

    def get_queryset(self):
        return models.Subcategory.objects.filter(owner=self.request.user).order_by('name')
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PlaceViewSet(viewsets.ModelViewSet):
    queryset = models.Place.objects.all()
    permission_classes = [IsAuthenticated, IsOwner]
    pagination_class = Unpaginated
    serializer_class = serializers.PlaceSerializer

    def get_queryset(self):
        return models.Place.objects.filter(owner=self.request.user).order_by('name')
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)