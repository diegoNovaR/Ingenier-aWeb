from django.db import models
from .empresa import Empresa

class Cancha(models.Model):

    TIPO_CHOICES = [
        ('futbol', 'Fútbol'),
        ('fulbito', 'Fulbito'),
        ('voley', 'Vóley'),
        ('otro', 'Otro'),
    ]

    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name="canchas")
    nombre = models.CharField(max_length=50)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    precio_hora = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.nombre} - {self.empresa.nombre}"