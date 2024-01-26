function data() {
  fetch('./tot/chat.json')
    .then(response => response.json())
    .then(data => {
      // lakukan sesuatu dengan data
      comment(data);
    })
    .catch(error => console.error('Error:', error));
}

function comment(data) {

  let anis = 0;
  let prabowo = 0;
  let ganjar = 0;
  let i = 1;
  let body = '';
  let bgColor = '#f2f2f2';

  // Add the data rows
  let komen = document.querySelector('#tbody');
  let voter = [];

  // Loop through each comment
  for (const isi of data) {
    const message = isi.message.toLowerCase();
    const nama = isi.author.name;
    const photo = isi.author.images[1].url;

    // Check for ganjar mentions
    if (message.includes("ganjar") || message.includes("mahfud") || message.includes("3") || message.includes("03")) {
      if (!voter.includes(nama)) {
        ganjar++;
        voter.push(nama);
      }
      bgColor = 'linear-gradient(45deg, #fffaaa, #ffaaaa)';
    }

    // Check for prabowo mentions
    if (message.includes("prabowo") || message.includes("gibran") || message.includes("2") || message.includes("02")) {
      if (!voter.includes(nama)) {
        prabowo++;
        voter.push(nama);
      }
      bgColor = 'linear-gradient(45deg, #aaffff, #fffaaa)';
    }

    // Check for anis mentions
    if (message.includes("anis") || message.includes("muhaimin") || message.includes("amin") || message.includes("imin") || message.includes("1") || message.includes("01")) {
      if (!voter.includes(nama)) {
        anis++;
        voter.push(nama);
      }
      bgColor = 'linear-gradient(45deg, #aaffaa, #fffaaa)';
    }

    body += `
      <tr style="background: ${bgColor}">
      <td>${i++}</td>
      <td><img src="${photo}"/></td>
      <td>${nama}</td>
      <td>${message}</td>
      </tr>
    `;
  }
  body += "<tr><td></td><td></td><td></td><td></td></tr>";
  komen.innerHTML = body;

  load(anis, prabowo, ganjar);

  console.log(`Anis mentions: ${anis}`);
  console.log(`Prabowo mentions: ${prabowo}`);
  console.log(`Ganjar mentions: ${ganjar}`);
}

function load(aniss, prabowoo, ganjarr) {
  const total = aniss + prabowoo + ganjarr;
  let percentageA = (aniss / total) * 100;
  let percentageP = (prabowoo / total) * 100;
  let percentageG = (ganjarr / total) * 100;

  let a = aniss;
  let aa = `${percentageA.toFixed(1)}%`;
  let anis = document.querySelector('#a');
  anis.innerHTML = `<center>${aa}<br>${a}</center>`;
  var element = document.querySelector('.aa');
  element.style.setProperty('--size', `calc(${a} / ${total})`);

  let p = prabowoo;
  let pp = `${percentageP.toFixed(1)}%`;
  let prabowo = document.querySelector('#p');
  prabowo.innerHTML = `<center>${pp}<br>${p}</center>`;
  var element = document.querySelector('.pp');
  element.style.setProperty('--size', `calc(${p} / ${total})`);

  let g = ganjarr;
  let gg = `${percentageG.toFixed(1)}%`;
  let ganjar = document.querySelector('#g');
  ganjar.innerHTML = `<center>${gg}<br>${g}</center>`;
  var element = document.querySelector('.gg');
  element.style.setProperty('--size', `calc(${g} / ${total})`);

  scrollToBottom();
}

function scrollToBottom() {
  var tableContainer = document.querySelector('.table-container');
  tableContainer.scrollTop = tableContainer.scrollHeight;
}

setInterval(() => {
  data();
}, 5000);