  // Initialize Firebase
  var config = {
   apiKey: "AIzaSyB_tdzSiSvpy7FbjjJ6zMIl5dYJ5j1-8pU",
   authDomain: "timesheet-d1799.firebaseapp.com",
   databaseURL: "https://timesheet-d1799.firebaseio.com",
   projectId: "timesheet-d1799",
   storageBucket: "timesheet-d1799.appspot.com",
   messagingSenderId: "523086025845"
 };
 firebase.initializeApp(config)
 database = firebase.database()


let currentDate = moment()

console.log("a")
$("#submit").click(function(event) {
 event.preventDefault();

 let startDate = $("#startDate").val().trim()
 startDate = moment(startDate)
 let name = $("#employeeName").val().trim()
 let monthlyPay = $("#monthlyPay").val().trim()
 let position = $("#position").val().trim()
 let monthsWorked = currentDate.diff(startDate, "months")
 let total = monthlyPay * monthsWorked
 startDate = moment(startDate).format("MM/DD/YYYY")
 database.ref().push({
  name: name,
  position: position,
  total: total,
  startDate: startDate
 })

})

database.ref().on("child_added", function(snapshot) {
 let tbody = $("#currentEmployees tbody")
 let sv = snapshot.val()
 let tn = $("<td>").text(sv.name)
 let ps = $("<td>").text(sv.position)
 let sd = $("<td>").text(sv.startDate)
 let mw = $("<td>").text(sv.monthsWorked)
 let mp = $("<td>").text(sv.monthlyPay)
 let tt = $("<td>").text(sv.total)

 
 employee = $("<tr>").append(tn, ps, sd, mw, mp, tt);
 tbody.append(employee)
})