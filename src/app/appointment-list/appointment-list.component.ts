import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  ngOnInit(): void {
    for (let index = 0; index < localStorage.length; index++) {
      let object = localStorage.key(index)
      if (object != null) {
        let elementKey: string = object.toString();
        let elementValue = localStorage.getItem(elementKey);
        if (elementValue != null) {
          let appointment: Appointment = JSON.parse(elementValue)
          this.appointments.push(appointment);
        }
      }
    }
  }

  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date()

  appointments: Appointment[] = [];

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: uuidv4(),
        date: this.newAppointmentDate,
        title: this.newAppointmentTitle
      };

      this.appointments.push(newAppointment);
      localStorage.setItem(newAppointment.id, JSON.stringify(newAppointment))

      //Clear textfields with data mapping
      this.newAppointmentDate = new Date();
      this.newAppointmentTitle = "";
    }
  }

  deleteAppointment(index: number) {
    let appointmentDef = this.appointments[index];
    localStorage.removeItem(appointmentDef.id)
    this.appointments.splice(index, 1);
  }
}
