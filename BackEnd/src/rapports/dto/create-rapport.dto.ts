export class CreateRapportDto {
  patient: string;
  appointmentDate: string;
  description: string;
  prescription: { name: string; dosage: string; duration: string }[];
}
