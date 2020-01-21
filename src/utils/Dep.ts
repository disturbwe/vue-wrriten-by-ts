let uid: number = 0

class Dep {
    id: number = uid++;
    subs: Array<string> = [];
}