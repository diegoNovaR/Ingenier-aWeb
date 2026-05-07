using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Mono.TextTemplating;
using scaffoldingCRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace scaffoldingCRUD.Controllers
{
    public class CanchasController : Controller
    {
        private readonly CanchitasIwContext _context;

        public CanchasController(CanchitasIwContext context)
        {
            _context = context;
        }

        // GET: Canchas
        public async Task<IActionResult> Index()
        {
            var canchitasIwContext = _context.Canchas.Include(c => c.IdEmpresaNavigation);
            return View(await canchitasIwContext.ToListAsync());
        }

        // GET: Canchas/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cancha = await _context.Canchas
                .Include(c => c.IdEmpresaNavigation)
                .FirstOrDefaultAsync(m => m.IdCancha == id);
            if (cancha == null)
            {
                return NotFound();
            }

            return View(cancha);
        }

        // GET: Canchas/Create
        public IActionResult Create()
        {
            ViewData["IdEmpresa"] = new SelectList(_context.Empresas, "IdEmpresa", "Nombre");
            return View();
        }

        // POST: Canchas/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("IdCancha,IdEmpresa,Nombre,Tipo,PrecioHora")] Cancha cancha)
        {
            ModelState.Remove("IdEmpresaNavigation");

            if (ModelState.IsValid)
            {
                _context.Add(cancha);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdEmpresa"] = new SelectList(_context.Empresas, "IdEmpresa", "IdEmpresa", cancha.IdEmpresa);
            return View(cancha);
        }

        // GET: Canchas/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cancha = await _context.Canchas.FindAsync(id);
            if (cancha == null)
            {
                return NotFound();
            }
            ViewData["IdEmpresa"] = new SelectList(_context.Empresas, "IdEmpresa", "IdEmpresa", cancha.IdEmpresa);
            return View(cancha);
        }

        // POST: Canchas/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("IdCancha,IdEmpresa,Nombre,Tipo,PrecioHora")] Cancha cancha)
        {
            if (id != cancha.IdCancha)
            {
                return NotFound();
            }

            ModelState.Remove("IdEmpresaNavigation");

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cancha);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CanchaExists(cancha.IdCancha))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["IdEmpresa"] = new SelectList(_context.Empresas, "IdEmpresa", "IdEmpresa", cancha.IdEmpresa);
            return View(cancha);
        }

        // GET: Canchas/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cancha = await _context.Canchas
                .Include(c => c.IdEmpresaNavigation)
                .FirstOrDefaultAsync(m => m.IdCancha == id);
            if (cancha == null)
            {
                return NotFound();
            }

            return View(cancha);
        }

        // POST: Canchas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var cancha = await _context.Canchas.FindAsync(id);
            if (cancha != null)
            {
                _context.Canchas.Remove(cancha);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CanchaExists(int id)
        {
            return _context.Canchas.Any(e => e.IdCancha == id);
        }
    }
}
