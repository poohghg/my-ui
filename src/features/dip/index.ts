interface NotificationAPI {
  send(message: string, severity: 'info' | 'warning' | 'error'): void;
}

class EmailNotification implements NotificationAPI {
  // 이메일 관련 설정 및 초기화 코드
  send(message: string, severity: 'info' | 'warning' | 'error'): void {
    console.log(`Email sent with ${severity} severity: ${message}`);
  }
}

class Application {
  private notifier: NotificationAPI[];

  constructor(notifier: NotificationAPI[]) {
    this.notifier = notifier;
  }

  process(message: string, severity: 'info' | 'warning' | 'error' = 'info') {
    this.notifier.forEach(n => n.send(message, severity));
  }
}

const emailNotifier = new EmailNotification();
const app = new Application([emailNotifier]);
app.process('This is a warning message', 'warning');
