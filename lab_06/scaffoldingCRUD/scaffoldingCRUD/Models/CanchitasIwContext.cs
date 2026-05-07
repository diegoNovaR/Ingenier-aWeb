using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace scaffoldingCRUD.Models;

public partial class CanchitasIwContext : DbContext
{
    public CanchitasIwContext()
    {
    }

    public CanchitasIwContext(DbContextOptions<CanchitasIwContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cancha> Canchas { get; set; }

    public virtual DbSet<Empresa> Empresas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cancha>(entity =>
        {
            entity.HasKey(e => e.IdCancha).HasName("PK__Cancha__067952802C82BEF7");

            entity.ToTable("Cancha");

            entity.Property(e => e.IdCancha).HasColumnName("id_cancha");
            entity.Property(e => e.IdEmpresa).HasColumnName("id_empresa");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.PrecioHora)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("precio_hora");
            entity.Property(e => e.Tipo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tipo");

            entity.HasOne(d => d.IdEmpresaNavigation).WithMany(p => p.Canchas)
                .HasForeignKey(d => d.IdEmpresa)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Cancha_Empresa");
        });

        modelBuilder.Entity<Empresa>(entity =>
        {
            entity.HasKey(e => e.IdEmpresa).HasName("PK__Empresa__4A0B7E2C34A24D3B");

            entity.ToTable("Empresa");

            entity.Property(e => e.IdEmpresa).HasColumnName("id_empresa");
            entity.Property(e => e.Direccion)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("telefono");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
