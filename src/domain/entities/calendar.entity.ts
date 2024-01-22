export class CalendarEntity {
  constructor (
    public id: string,
    public title: string,
    public notes: string,
    public start: Date,
    public end: Date,
    public user: {
      id: string
      name: string
    }
  ) {}
}
