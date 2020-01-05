from rest_framework.pagination import PageNumberPagination

class Unpaginated(PageNumberPagination):
    def paginate_queryset(self, queryset, request, view=None):
        if request.query_params.get('get_all', False) == 'true':
            return None
        return super().paginate_queryset(queryset, request, view=view)
