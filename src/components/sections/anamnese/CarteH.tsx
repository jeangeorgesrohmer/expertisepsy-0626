import { CarteHData, YesNoNR } from '../../../types/anamnese';
import { FormRow, SectionCard, StandaloneText, InlineNumber, SubSectionTitle } from '../../ui/FormRow';
import TriToggle from '../../ui/TriToggle';

interface Props {
  data: CarteHData;
  onChange: (data: CarteHData) => void;
}

export default function CarteH({ data, onChange }: Props) {
  const set = (field: keyof CarteHData, value: YesNoNR | string) =>
    onChange({ ...data, [field]: value });

  const hasSpecificMesure =
    data.tutelle === 'Oui' ||
    data.curatelle === 'Oui' ||
    data.curatelleSimple === 'Oui' ||
    data.curatelleRenforcee === 'Oui' ||
    data.sauvegardeDejustice === 'Oui' ||
    data.habilitationFamiliale === 'Oui' ||
    data.mandatProtectionFuture === 'Oui';

  return (
    <SectionCard title="H. Situation familiale et sociale">
      <SubSectionTitle title="Statut marital" />
      <FormRow label="Célibataire">
        <TriToggle value={data.celibataire} onChange={(v) => set('celibataire', v)} />
      </FormRow>
      <FormRow label="En couple">
        <TriToggle value={data.enCouple} onChange={(v) => set('enCouple', v)} />
      </FormRow>
      <FormRow label="Marié(e)">
        <TriToggle value={data.marie} onChange={(v) => set('marie', v)} />
      </FormRow>
      <FormRow label="Divorcé(e)">
        <TriToggle value={data.divorce} onChange={(v) => set('divorce', v)} />
      </FormRow>
      <FormRow label="Séparé(e)">
        <TriToggle value={data.separe} onChange={(v) => set('separe', v)} />
      </FormRow>
      <FormRow label="Veuf / Veuve">
        <TriToggle value={data.veuf} onChange={(v) => set('veuf', v)} />
      </FormRow>

      <SubSectionTitle title="Enfants" />
      <FormRow label="Enfants">
        <TriToggle value={data.enfants} onChange={(v) => set('enfants', v)} />
        <InlineNumber value={data.enfantsNombre} onChange={(v) => set('enfantsNombre', v)} placeholder="Nombre" />
      </FormRow>
      <FormRow label="Contact régulier avec les enfants">
        <TriToggle value={data.contactRegulierEnfants} onChange={(v) => set('contactRegulierEnfants', v)} />
      </FormRow>
      <FormRow label="Mesures judiciaires enfants">
        <TriToggle value={data.mesuresJudiciairesEnfants} onChange={(v) => set('mesuresJudiciairesEnfants', v)} />
      </FormRow>

      <SubSectionTitle title="Logement" />
      <FormRow label="Domicile stable">
        <TriToggle value={data.domicileStable} onChange={(v) => set('domicileStable', v)} />
      </FormRow>
      <FormRow label="Sans domicile fixe">
        <TriToggle value={data.sansDomicileFixe} onChange={(v) => set('sansDomicileFixe', v)} />
      </FormRow>
      <FormRow label="Hébergé">
        <TriToggle value={data.heberge} onChange={(v) => set('heberge', v)} />
      </FormRow>
      <FormRow label="En institution">
        <TriToggle value={data.enInstitution} onChange={(v) => set('enInstitution', v)} />
      </FormRow>

      <SubSectionTitle title="Réseau social" />
      <FormRow label="Isolement social">
        <TriToggle value={data.isolementSocial} onChange={(v) => set('isolementSocial', v)} />
      </FormRow>
      <FormRow label="Relations amicales">
        <TriToggle value={data.relationsAmicales} onChange={(v) => set('relationsAmicales', v)} />
      </FormRow>
      <FormRow label="Relations familiales préservées">
        <TriToggle value={data.relationsFamilialesPreservees} onChange={(v) => set('relationsFamilialesPreservees', v)} />
      </FormRow>

      <SubSectionTitle title="Mesures de protection juridique" />
      <FormRow label="Mesure de protection">
        <TriToggle value={data.mesureProtection} onChange={(v) => set('mesureProtection', v)} />
      </FormRow>

      {data.mesureProtection === 'Oui' && (
        <>
          <FormRow label="Tutelle">
            <TriToggle value={data.tutelle} onChange={(v) => set('tutelle', v)} />
          </FormRow>
          <FormRow label="Curatelle">
            <TriToggle value={data.curatelle} onChange={(v) => set('curatelle', v)} />
          </FormRow>
          <FormRow label="Curatelle simple">
            <TriToggle value={data.curatelleSimple} onChange={(v) => set('curatelleSimple', v)} />
          </FormRow>
          <FormRow label="Curatelle renforcée">
            <TriToggle value={data.curatelleRenforcee} onChange={(v) => set('curatelleRenforcee', v)} />
          </FormRow>
          <FormRow label="Sauvegarde de justice">
            <TriToggle value={data.sauvegardeDejustice} onChange={(v) => set('sauvegardeDejustice', v)} />
          </FormRow>
          <FormRow label="Habilitation familiale">
            <TriToggle value={data.habilitationFamiliale} onChange={(v) => set('habilitationFamiliale', v)} />
          </FormRow>
          <FormRow label="Mandat de protection future">
            <TriToggle value={data.mandatProtectionFuture} onChange={(v) => set('mandatProtectionFuture', v)} />
          </FormRow>

          {hasSpecificMesure && (
            <>
              <StandaloneText label="Date de mise en place" value={data.dateMiseEnPlace} onChange={(v) => set('dateMiseEnPlace', v)} placeholder="ex: 01/2022" />
              <FormRow label="Membre de la famille">
                <TriToggle value={data.membreFamille} onChange={(v) => set('membreFamille', v)} />
              </FormRow>
              <FormRow label="Mandataire judiciaire">
                <TriToggle value={data.mandataireJudiciaire} onChange={(v) => set('mandataireJudiciaire', v)} />
              </FormRow>
              <StandaloneText label="Préciser tuteur/curateur" value={data.preciserTuteurCurateur} onChange={(v) => set('preciserTuteurCurateur', v)} />
              <StandaloneText label="Date de renouvellement prévue" value={data.dateRenouvellementPrevue} onChange={(v) => set('dateRenouvellementPrevue', v)} placeholder="ex: 06/2025" />
            </>
          )}
        </>
      )}
    </SectionCard>
  );
}
