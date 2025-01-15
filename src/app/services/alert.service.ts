import {Injectable} from '@angular/core';
import {ItNotificationService, NotificationPosition, NotificationType} from 'design-angular-kit';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private static readonly NOTIFICATION_DEFAULT_POSITION: NotificationPosition = NotificationPosition.Bottom;
  private static readonly NOTIFICATION_DEFAULT_DISMISSABLE: boolean = true;
  private static readonly NOTIFICATION_DEFAULT_DURATION: number = 5000;


  constructor(private notificationService: ItNotificationService) {
  }

  public showSuccess(title: string, message: string = '', duration: number = AlertService.NOTIFICATION_DEFAULT_DURATION): void {
    this.notificationService.addNotification({
      type: NotificationType.Success,
      title: title,
      message: message,
      dismissible: AlertService.NOTIFICATION_DEFAULT_DISMISSABLE,
      position: AlertService.NOTIFICATION_DEFAULT_POSITION,
      duration: duration
    });
  }

  public showInfo(title: string, message: string = ''): void {
    this.notificationService.addNotification({
      type: NotificationType.Info,
      title: title,
      message: message,
      dismissible: AlertService.NOTIFICATION_DEFAULT_DISMISSABLE,
      position: AlertService.NOTIFICATION_DEFAULT_POSITION,
      duration: AlertService.NOTIFICATION_DEFAULT_DURATION
    });
  }

  public showError(title: string, message: string = '', duration: number = AlertService.NOTIFICATION_DEFAULT_DURATION): void {
    this.notificationService.addNotification({
      type: NotificationType.Error,
      title: title,
      message: message,
      dismissible: AlertService.NOTIFICATION_DEFAULT_DISMISSABLE,
      position: AlertService.NOTIFICATION_DEFAULT_POSITION,
      duration: duration
    });
  }


}
