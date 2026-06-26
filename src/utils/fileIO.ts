import type { FormData, INITIAL_FORM_DATA } from '../types';

export function exportFormData(data: FormData) {
  const nom = data.identification.carteA.nom || 'inconnu';
  const prenom = data.identification.carteA.prenom || '';
  const slug = [prenom, nom]
    .filter(Boolean)
    .join('_')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .toLowerCase();
  const date = new Date().toISOString().slice(0, 10);
  const filename = `expertise_${slug}_${date}.json`;

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 500);
}

export function importFormData(
  defaults: typeof INITIAL_FORM_DATA,
): Promise<FormData | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string);
          const merged = deepMerge(defaults, parsed) as FormData;
          resolve(merged);
        } catch {
          alert('Fichier invalide. Veuillez selectionner un fichier JSON d\'expertise valide.');
          resolve(null);
        }
      };
      reader.onerror = () => resolve(null);
      reader.readAsText(file);
    };
    input.oncancel = () => resolve(null);
    input.click();
  });
}

function deepMerge(
  defaults: Record<string, unknown>,
  overrides: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...defaults };
  const keys = new Set([...Object.keys(defaults), ...Object.keys(overrides)]);
  for (const key of keys) {
    const def = defaults[key];
    const ov = overrides[key];
    if (ov === undefined || ov === null) continue;
    if (def === undefined) {
      result[key] = ov;
      continue;
    }
    if (
      typeof def === 'object' &&
      def !== null &&
      !Array.isArray(def) &&
      typeof ov === 'object' &&
      !Array.isArray(ov)
    ) {
      result[key] = deepMerge(
        def as Record<string, unknown>,
        ov as Record<string, unknown>,
      );
    } else {
      result[key] = ov;
    }
  }
  return result;
}
