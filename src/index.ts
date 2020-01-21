/**/
import observer from "./utils/Observer"

let data = { user: {name: "123"} };
observer.createObserve(data)
data.user.name = "456"