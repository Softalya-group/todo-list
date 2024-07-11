import {TodoModel} from "../model/todoModel";// Eğer TodoModel ayrı bir dosyada ise

export const todoList = [
    new TodoModel("araba yıka", "Arabayı hemen yıka", "2024-07-08T14:00:00Z", true),
    new TodoModel("alışveriş yap", "Market alışverişini yap", "2024-07-08T16:00:00Z", false),
    new TodoModel("ev temizliği", "Evi temizle", "2024-07-09T08:00:00Z", false),
    new TodoModel("rapor yaz", "Haftalık raporu yaz", "2024-07-09T10:00:00Z", false),
    new TodoModel("spor yap", "Sabah sporu", "2024-07-09T06:00:00Z", false),
    new TodoModel("arkadaşla buluş", "Arkadaşla buluş", "2024-07-10T18:00:00Z", false)
];
