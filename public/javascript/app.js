console.log('Connected');

let icons = [
  'fas fa-basketball-ball',
  'fas fa-futbol',
  'fas fa-baseball-ball',
  'fas fa-football-ball',
  'fas fa-hockey-puck'
];
let i = 0;

let iconInterval = setInterval(iconShow, 1200);
let iconDiv = document.getElementById('iconShow');
function iconShow() {
  iconDiv.classList = icons[i];
  console.log(iconDiv.classList);
  i < icons.length - 1 ? i++ : (i = 0);
}
