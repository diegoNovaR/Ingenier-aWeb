using System;
using System.Collections.Generic;

namespace scaffoldingCRUD.Models;

public partial class Empresa
{
    public int IdEmpresa { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Direccion { get; set; }

    public string? Telefono { get; set; }

    public string? Email { get; set; }

    public virtual ICollection<Cancha> Canchas { get; set; } = new List<Cancha>();
}
