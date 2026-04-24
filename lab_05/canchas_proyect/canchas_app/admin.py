from django.contrib import admin
from .models import TipoCancha, Cancha, Reserva

# Configuración del encabezado del panel
admin.site.site_header = "Administración de Canchas Proyect"
admin.site.site_title = "Canchas Proyect"
admin.site.index_title = "Gestión del Complejo Deportivo"

@admin.register(TipoCancha)
class TipoCanchaAdmin(admin.ModelAdmin):
    list_display = ('id', 'descripcion')
    search_fields = ('descripcion',)

@admin.register(Cancha)
class CanchaAdmin(admin.ModelAdmin):
    # Esto hace que la tabla se vea con columnas organizadas
    list_display = ('nombre', 'tipo', 'precio_hora', 'esta_disponible')
    
    # Añade una barra lateral para filtrar rápidamente
    list_filter = ('tipo', 'esta_disponible')
    
    # Añade un buscador por nombre
    search_fields = ('nombre',)
    
    # Permite editar la disponibilidad directamente desde la lista sin entrar al registro
    list_editable = ('esta_disponible', 'precio_hora')

@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ('nombre_cliente', 'cancha', 'fecha_reserva', 'duracion_horas')
    
    # Organiza el formulario por secciones (Fieldsets)
    fieldsets = (
        ('Información del Cliente', {
            'fields': ('nombre_cliente',)
        }),
        ('Detalles de la Reserva', {
            'fields': ('cancha', 'fecha_reserva', 'duracion_horas'),
            'description': 'Seleccione la cancha y el horario pactado'
        }),
    )
    
    # Filtro por fecha para ver reservas de hoy, ayer, etc.
    list_filter = ('fecha_reserva', 'cancha')
    date_hierarchy = 'fecha_reserva'  # Añade una barra de navegación por fechas arriba