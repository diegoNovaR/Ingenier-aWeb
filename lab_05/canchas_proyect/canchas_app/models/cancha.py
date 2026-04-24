from django.db import models

class TipoCancha(models.Model):
    # Ejemplo: Grass Sintético, Losa Deportiva, Fútbol 7
    descripcion = models.CharField(max_length=100, verbose_name="Tipo de Cancha")

    def __str__(self):
        return self.descripcion

class Cancha(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre de la Cancha")
    tipo = models.ForeignKey(TipoCancha, on_delete=models.CASCADE)
    precio_hora = models.DecimalField(max_digits=6, decimal_places=2, verbose_name="Precio por Hora")
    esta_disponible = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre} ({self.tipo})"

class Reserva(models.Model):
    cancha = models.ForeignKey(Cancha, on_delete=models.CASCADE)
    nombre_cliente = models.CharField(max_length=100)
    fecha_reserva = models.DateTimeField()
    duracion_horas = models.IntegerField(default=1)

    def __str__(self):
        return f"Reserva de {self.nombre_cliente} - {self.cancha.nombre}"