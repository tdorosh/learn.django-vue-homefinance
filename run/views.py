from django.shortcuts import render

def run(request):
    return render(request, 'run/index.html')
