export interface SendMailOptions<P> {
  to: string;
  from: string;
  subject: string;
  params: P;
}
