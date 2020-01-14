from django_filters import rest_framework as filters

from accounting import models


class TransactionFilterSet(filters.FilterSet):
    from_amount = filters.NumberFilter(field_name="amount", lookup_expr='gte')
    to_amount = filters.NumberFilter(field_name="amount", lookup_expr='lte')
    create_date = filters.DateFilter(field_name="create_datetime", lookup_expr='date', input_formats=['%d.%m.%Y'])

    class Meta:
        model = models.Transaction
        fields = ['from_amount', 'to_amount', 'currency', 'trans_type', 'category',
                'subcategory', 'on_account', 'from_account', 'create_date', 'place']

class AccountFilterSet(filters.FilterSet):
    from_amount = filters.NumberFilter(field_name="amount", lookup_expr='gte')
    to_amount = filters.NumberFilter(field_name="amount", lookup_expr='lte')
    create_date = filters.DateFilter(field_name="create_datetime", lookup_expr='date', input_formats=['%d.%m.%Y'])

    class Meta:
        model = models.Account
        fields = ['title', 'from_amount', 'to_amount', 'currency', 'notes', 'create_date']

class AccountJournalFilterSet(filters.FilterSet):
    from_amount_before = filters.NumberFilter(field_name="amount_before", lookup_expr='gte')
    to_amount_before = filters.NumberFilter(field_name="amount_before", lookup_expr='lte')
    from_amount_after = filters.NumberFilter(field_name="amount_after", lookup_expr='gte')
    to_amount_after = filters.NumberFilter(field_name="amount_after", lookup_expr='lte')
    create_date = filters.DateFilter(field_name="timestamp", lookup_expr='date', input_formats=['%d.%m.%Y'])

    class Meta:
        model = models.AccountJournal
        fields = ['account', 'from_amount_before', 'to_amount_before', 'from_amount_after', 'to_amount_after', 'create_date']

class CategoryFilterSet(filters.FilterSet):
    class Meta:
        model = models.Category
        fields = ['name', 'cat_type']

class SubcategoryFilterSet(filters.FilterSet):
    class Meta:
        model = models.Subcategory
        fields = ['name', 'category']