using System;
using System.Collections.Generic;

namespace scaffoldingCRUD.Models;

public partial class Cancha
{
    public int IdCancha { get; set; }

    public int IdEmpresa { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Tipo { get; set; }

    public decimal? PrecioHora { get; set; }

    public virtual Empresa IdEmpresaNavigation { get; set; } = null!;
}
