<template>
    <div class="container">
        <div class="calendar">
            <div class="header">
                <div class="month">{{ formattedMonth }}</div>
                <div class="btns">
                    <div class="btn today-btn" @click="goToDay">
                        <i class="fas fa-calendar-day"></i>
                    </div>
                    <div class="btn prev-btn" @click="prevMonth">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div class="btn next-btn" @click="nextMonth">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
            <div class="weekdays">
                <div class="day" v-for="day in days" :key="day">{{ day }}</div>
            </div>
            <div class="days">
                <div v-for="day in daysArray" :key="day.date" :class="dayClasses(day)">
                    {{ day.day }}
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        };
    },
    computed: {
        formattedMonth() {
            const date = new Date(this.currentYear, this.currentMonth);
            const options = { month: 'long', year: 'numeric' };
            return new Intl.DateTimeFormat('es', options).format(date); // Utiliza la configuración regional para español
        },
        daysArray() {
            const firstDay = new Date(this.currentYear, this.currentMonth, 1);
            const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
            const prevLastDay = new Date(this.currentYear, this.currentMonth, 0);
            const nextDays = 7 - lastDay.getDay() - 1;

            const daysArray = [];
            for (let x = firstDay.getDay(); x > 0; x--) {
                const date = new Date(prevLastDay);
                date.setDate(prevLastDay.getDate() - x + 1);
                daysArray.push({ date, day: date.getDate(), type: "prev" });
            }

            for (let i = 1; i <= lastDay.getDate(); i++) {
                const date = new Date(this.currentYear, this.currentMonth, i);
                daysArray.push({ date, day: i, type: "current" });
            }

            for (let j = 1; j <= nextDays; j++) {
                const date = new Date(this.currentYear, this.currentMonth + 1, j);
                daysArray.push({ date, day: j, type: "next" });
            }

            return daysArray;
        },
    },
    methods: {
        nextMonth() {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
        },
        prevMonth() {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
        },
        goToDay() {
            this.currentMonth = new Date().getMonth();
            this.currentYear = new Date().getFullYear();
        },
        selectDate(day) {
            // Implement your logic when a date is selected
            console.log(day);
        },
        dayClasses(day) {
            return {
                day: true,
                prev: day.type === "prev",
                current: day.type === "current",
                next: day.type === "next",
                today: this.isToday(day.date),
            };
        },
        isToday(date) {
            const today = new Date();
            return (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            );
        },
    },
};
</script>
  
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);

:root {
    --primary-color: #f90a39;
    --text-color: #1d1d1d;
    --bg-color: #a6a6a6;
}

* {
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

.container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: #0a08083e 1px solid;
    border-radius: 10px;
}

.calendar {
    width: 100%;
    padding: 30px 20px;
    border-radius: 10px;
    background-color: var(--bg-color);
}

.calendar .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
}

.month {
    color: #0850e0;
    text-transform: capitalize;
}

.calendar .header {
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
    color: var(--text-color);
}

.calendar .header .btns {
    display: flex;
    gap: 10px;
}

.calendar .header .btns .btn {
    width: 50px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: #0850e0;
    background-color: var(--primary-color);
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
}

.calendar .header .btns .btn:hover {
    background-color: #e7e9ff;
    transform: scale(1.05);
}

.weekdays {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.weekdays .day {
    width: calc(100% / 7 - 10px);
    text-align: center;
    font-size: 16px;
    font-weight: 600;
}

.days {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.days .day {
    width: calc(100% / 7 - 10px);
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 400;
    color: var(--text-color);
    background-color: #fff;
    transition: all 0.3s;
}

.days .day:not(.next):not(.prev):hover {
    color: #f74747;
    background-color: var(--primary-color);
    transform: scale(1.05);
}

.days .day.today {
    color: #ff0000;
    background-color: var(--primary-color);
}

.days .day.next,
.days .day.prev {
    color: #ccc;
}
</style>
  