class AlarmClock {
    constructor() {
        // Выделяем память для объекта
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        // Проверка наличия параметров
        if (!time || !callback) {
            throw new Error('Отсутствуют обязательные аргументы');
        }

        // Проверка наличия звонка с таким же временем
        const existingAlarm = this.alarmCollection.find(alarm => alarm.time === time);
        if (existingAlarm) {
            console.warn('Уже присутствует звонок на это же время');
        }

        // Добавляем звонок в коллекцию
        this.alarmCollection.push({
            callback: callback,
            time: time,
            canCall: true
        });
    }

    removeClock(time) {
        // Удаляем звонки по времени
        this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
    }

    getCurrentFormattedTime() {
        // Получаем текущее время в формате HH:MM
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0'); // приведение часов к двузначному виду при необходимости
        const minutes = String(now.getMinutes()).padStart(2, '0'); // приведение минут к двузначному виду при необходимости
        return `${hours}:${minutes}`; 
    }

    start() {
        // Проверка наличия активного интервала
        if (this.intervalId) {
            return;
        }

        // Создание интервала
        this.intervalId = setInterval(() => {
            const currentTime = this.getCurrentFormattedTime();

            // Перебор звонков
            this.alarmCollection.forEach(alarm => {
                if (alarm.time === currentTime && alarm.canCall) {
                    alarm.canCall = false; // звонок не будет выполнен повторно
                    alarm.callback(); // звонок выполняется, если время звонка и текущее время совпали и звонок может быть выполнен
                }
            });
        }, 1000);
    }

    stop() {
        // Остановка интервала
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetAllCalls() {
        // Сброс возможности вызова звонков
        this.alarmCollection.forEach(alarm => {
            alarm.canCall = true;
        });
    }

    clearAlarms() {
        // Остановка интервала и удаление звонков
        this.stop();
        this.alarmCollection = [];
    }
    
}