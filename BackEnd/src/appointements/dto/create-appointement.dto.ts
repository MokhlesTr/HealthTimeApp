export class CreateAppointmentDto {
  readonly date: string;
  readonly duration: number;
  readonly state: number;
  readonly subject: string;
  readonly doctorId: number;
  readonly patientId: number;
}
