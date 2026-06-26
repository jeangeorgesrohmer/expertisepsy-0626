import { useEffect } from 'react';
import { IdentCarteAData, DocumentMode } from '../../../types';
import { SectionCard } from '../../ui/FormRow';

interface Props {
  data: IdentCarteAData;
  onChange: (d: IdentCarteAData) => void;
  documentMode: DocumentMode;
}

const inputClass =
  'w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors min-h-[2.75rem]';

const numberClass =
  'w-full sm:w-28 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors min-h-[2.75rem]';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-3 sm:py-2.5 border-b border-slate-50 last:border-b-0">
      <span className="text-sm text-slate-700 leading-snug sm:flex-shrink-0">{label}</span>
      <div className="flex-1 sm:max-w-xs w-full">{children}</div>
    </div>
  );
}

function calcAge(dateNaissance: string, dateExamen: string): string {
  if (!dateNaissance || !dateExamen) return '';
  const birth = new Date(dateNaissance);
  const exam = new Date(dateExamen);
  if (isNaN(birth.getTime()) || isNaN(exam.getTime())) return '';
  let age = exam.getFullYear() - birth.getFullYear();
  const birthdayPassedThisYear =
    exam.getMonth() > birth.getMonth() ||
    (exam.getMonth() === birth.getMonth() && exam.getDate() >= birth.getDate());
  if (!birthdayPassedThisYear) age -= 1;
  return age >= 0 ? String(age) : '';
}

export default function CarteA({ data, onChange, documentMode }: Props) {
  const set = (field: keyof IdentCarteAData, value: string) =>
    onChange({ ...data, [field]: value });

  useEffect(() => {
    const computed = calcAge(data.dateNaissance, data.dateExamen);
    if (data.age !== computed) {
      onChange({ ...data, age: computed });
    }
  }, [data.dateNaissance, data.dateExamen]);

  const title = documentMode === 'expertise'
    ? "A. Identité de l'examiné(e)"
    : "A. Identité du patient(e)";

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-4 sm:p-6">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">Identité de l'expert / praticien</p>
        <Row label="Nom de l'expert / Praticien">
          <input type="text" className="w-full px-3 py-2 rounded-lg border border-blue-300 bg-blue-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors min-h-[2.75rem]" placeholder="ex: Docteur Jean Dupont" value={data.authorName} onChange={(e) => set('authorName', e.target.value)} />
        </Row>
        <Row label="Titres / Fonctions">
          <input type="text" className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-blue-50/60 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors min-h-[2.75rem]" placeholder="ex: Psychiatre au CRAVS Alsace..." value={data.titresExpert} onChange={(e) => set('titresExpert', e.target.value)} />
        </Row>
      </div>

      <SectionCard title={title}>
        <Row label="Nom">
          <input type="text" className={inputClass} placeholder="Nom" value={data.nom} onChange={(e) => set('nom', e.target.value)} />
        </Row>
        <Row label="Prénom">
          <input type="text" className={inputClass} placeholder="Prénom" value={data.prenom} onChange={(e) => set('prenom', e.target.value)} />
        </Row>
        <Row label="Date de naissance">
          <input type="date" className={inputClass} value={data.dateNaissance} onChange={(e) => set('dateNaissance', e.target.value)} />
        </Row>
        <Row label="Âge">
          <input type="number" min={0} className={numberClass} placeholder="0" value={data.age} onChange={(e) => set('age', e.target.value)} />
        </Row>
        <Row label="Lieu de l'examen">
          <input type="text" className={inputClass} placeholder="Lieu" value={data.lieuExamen} onChange={(e) => set('lieuExamen', e.target.value)} />
        </Row>
        <Row label="Date de l'examen">
          <input type="date" className={inputClass} value={data.dateExamen} onChange={(e) => set('dateExamen', e.target.value)} />
        </Row>
        <Row label="Durée de l'examen">
          <input type="time" className={inputClass} value={data.dureeExamen} onChange={(e) => set('dureeExamen', e.target.value)} />
        </Row>
        {documentMode === 'expertise' && (
          <Row label="Identité du demandeur (Magistrat, OPJ...)">
            <input type="text" className={inputClass} placeholder="Ex: M. le Juge Dupont ou OPJ Martin..." value={data.requerant} onChange={(e) => set('requerant', e.target.value)} />
          </Row>
        )}
      </SectionCard>
    </div>
  );
}
