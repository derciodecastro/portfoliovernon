import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { services, site, type Service } from '../../data/content';

type FormState = { nome: string; contacto: string; email: string; nota: string };

const emptyForm: FormState = { nome: '', contacto: '', email: '', nota: '' };

export function Agendamento() {
  const [selected, setSelected] = useState<Service>(services[0]);
  const [form, setForm] = useState<FormState>(emptyForm);

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Reserva: ${selected.name}`;
    const body = [
      `Serviço: ${selected.name}`,
      `Nome: ${form.nome || '—'}`,
      `Contacto: ${form.contacto || '—'}`,
      `Email: ${form.email || '—'}`,
      `Preço indicativo: ${selected.price}`,
      '',
      `Nota: ${form.nota || '—'}`,
    ].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <motion.section
      key="agendamento"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="size-full overflow-y-auto custom-scrollbar bg-[#E8E4DA] text-black"
    >
      <div className="w-full min-h-full px-6 md:px-28 pt-[100px] md:pt-[140px] pb-16 flex items-start">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-20">
          {/* Coluna esquerda */}
          <div className="flex flex-col gap-10 pt-4">
            <div>
              <p className="text-[10px] tracking-[0.4em] text-black/40 font-outfit uppercase mb-4">O que ofereço</p>
              <h1 className="font-serif text-4xl md:text-5xl leading-[1.05]">
                Serviços para<br />
                <em className="italic font-light">cada</em> ocasião
              </h1>
            </div>

            <div className="flex flex-col gap-5">
              {services.map((service) => (
                <button key={service.id} onClick={() => setSelected(service)} className="flex items-center gap-8 text-left group">
                  <span className="text-[11px] tracking-[0.2em] font-outfit text-black/35 shrink-0 w-6">
                    {String(service.id).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-xl md:text-2xl font-sans font-black tracking-[0.03em] uppercase transition-colors duration-200 ${
                      selected.id === service.id ? 'text-[#8B1A1A]' : 'text-black/25 group-hover:text-black/50'
                    }`}
                  >
                    {service.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Coluna direita */}
          <div className="flex flex-col gap-5 pt-0 md:pt-32">
            <AnimatePresence mode="wait">
              <motion.form
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-5"
                onSubmit={handleSubmit}
              >
                {selected.image && (
                  <div className="self-end w-40 h-48 overflow-hidden shrink-0">
                    <img src={selected.image} alt={selected.name} loading="lazy" decoding="async" draggable={false} className="w-full h-full object-cover" />
                  </div>
                )}

                <p className="text-[10px] tracking-[0.15em] font-outfit text-black/55 leading-relaxed uppercase max-w-sm">
                  {selected.description}
                </p>

                <div className="flex flex-col gap-3">
                  <Field label="Nome" type="text" placeholder="O teu nome" value={form.nome} onChange={update('nome')} />
                  <Field label="Contacto" type="tel" placeholder="+244 9XX XXX XXX" value={form.contacto} onChange={update('contacto')} />
                  <Field label="Email" type="email" placeholder="email@exemplo.com" value={form.email} onChange={update('email')} />
                </div>

                <div className="flex flex-col">
                  {[
                    { label: 'Duração', value: selected.duration },
                    { label: 'Número de fotos', value: selected.photos },
                    { label: 'Entrega', value: selected.delivery },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-3 border-b border-[#8B1A1A]/40">
                      <span className="text-[10px] tracking-[0.15em] font-outfit text-black/50 uppercase">{row.label}</span>
                      <span className="text-[10px] tracking-[0.15em] font-outfit text-black font-semibold">{row.value}</span>
                    </div>
                  ))}
                  <div className="flex flex-col gap-1 py-3 border-b border-[#8B1A1A]/40">
                    <label className="text-[9px] tracking-[0.2em] font-outfit text-black/50 uppercase">Nota</label>
                    <textarea
                      rows={3}
                      value={form.nota}
                      onChange={update('nota')}
                      placeholder="Algum detalhe ou pedido especial..."
                      className="bg-transparent py-2 text-[11px] font-outfit text-black placeholder:text-black/25 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <p className="text-2xl font-sans font-black tracking-tight">{selected.price}</p>

                <button
                  type="submit"
                  className="w-full bg-[#8B1A1A] text-white text-[10px] tracking-[0.3em] uppercase font-outfit font-medium py-4 flex items-center justify-center hover:bg-[#6B1010] transition-colors duration-300"
                >
                  Reservar Sessão
                </button>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[9px] tracking-[0.2em] font-outfit text-black/50 uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent border-b border-[#8B1A1A]/40 py-2 text-[11px] font-outfit text-black placeholder:text-black/25 focus:outline-none focus:border-[#8B1A1A] transition-colors"
      />
    </div>
  );
}
