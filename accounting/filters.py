from django_filters import rest_framework as filters

from accounting import models


class TransactionFilterSet(filters.FilterSet):
    from_amount = filters.NumberFilter(field_name="amount", lookup_expr='gte')
    to_amount = filters.NumberFilter(field_name="amount", lookup_expr='lte')

    class Meta:
        model = models.Transaction
        fields = ['from_amount', 'to_amount', 'currency', 'trans_type', 'category',
                'subcategory', 'on_account', 'from_account', 'create_datetime', 'place', 'notes']

class AccountFilterSet(filters.FilterSet):
    from_amount = filters.NumberFilter(field_name="amount", lookup_expr='gte')
    to_amount = filters.NumberFilter(field_name="amount", lookup_expr='lte')

    class Meta:
        model = models.Account
        fields = ['title', 'from_amount', 'to_amount', 'currency', 'notes', 'create_datetime']

class AccountJournalFilterSet(filters.FilterSet):
    from_amount = filters.NumberFilter(field_name="amount_after", lookup_expr='gte')
    to_amount = filters.NumberFilter(field_name="amount_after", lookup_expr='lte')

    class Meta:
        model = models.AccountJournal
        fields = ['account', 'from_amount', 'to_amount', 'timestamp']

class CategoryFilterSet(filters.FilterSet):
    class Meta:
        model = models.Category
        fields = ['name', 'cat_type']

class SubcategoryFilterSet(filters.FilterSet):
    class Meta:
        model = models.Subcategory
        fields = ['name', 'category']