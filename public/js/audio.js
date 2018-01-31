// const socket = io.connect('http://localhost:3001');

// Pitches: Move up and down octaves by doubling and halving values, respectively.
// A4: 440Hz; B4: 493.88; C5: 523.25; D5: 587.33; E5: 659.25; F5: 698.46; G5: 783.99; A5: 880.00; B5: 987.77; C6: 1046.50

// Available waveforms: 'sine', 'square', 'sawtooth', 'triangle'

$(() => {

  const $soundPad = $('<div>').attr('id', 'sound-pad');
  $('#container').prepend($soundPad);
  const $allBtns = $('<div>').attr('id', 'all-btns');
  $soundPad.append($allBtns);
  for (i = 1; i <= 16; i++) {
    const $btn = $('<div>').attr('id', 'btn-' + i).addClass('btn');
    $allBtns.append($btn);
  }

  const context = new AudioContext();
  // const note = new Octavian.Note('A#4');

  const cMajPent = [261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51, 1567.98, 1760.00, 2093.00];
  // const onset = ['mousedown', 'keydown'];
  // const offset = ['mouseup', 'keyup'];

  const playTone = (btn, pitch, wvfrm) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    // oscillator.connect(context.destination);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.frequency.value = pitch;
    oscillator.type = wvfrm;
    // gain.volume.value = 0;
    oscillator.start(0);
    $(btn).mouseup(() => {
      oscillator.stop(0);
      oscillator.disconnect(0);
    });
  }

  const assignTone = (btn, pitch, wvfrm) => {
    $(btn).mousedown(() => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      // oscillator.connect(context.destination);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.frequency.value = pitch;
      oscillator.type = wvfrm;
      // gain.volume.value = 0;
      oscillator.start(0);
      $(btn).mouseup(() => {
        oscillator.stop(0);
        oscillator.disconnect(0);
      });
    });
  }

  for (let i = 0; i <= 15; i++) {
    $('#btn-'+(i+1)).attr('pitch', cMajPent[i]);
    $('#btn-'+(i+1)).attr('wvfrm', 'square');
    console.log($('#btn-'+(i+1)));
    assignTone($('#btn-'+(i+1)), $('#btn-'+(i+1)).attr('pitch'), $('#btn-'+(i+1)).attr('wvfrm'));
  }

  $('.btn').mousedown(() => {
    let btn = event.target;
    let $thisBtn = '#'+event.target.id;
    let pitch = $($thisBtn).attr('pitch');
    let wvfrm = $($thisBtn).attr('wvfrm');
    console.log($thisBtn, pitch, wvfrm);
    socket.emit('sound-pad', {
      btn: $thisBtn,
      pitch: pitch,
      wvfrm: wvfrm
    });
  });

  // $('.btn').mouseup(() => {
  //   socket.emit('sound-pad', {
  //     btn: '#'+event.target.id
  //   })
  // })

  socket.on('sound-pad', (data) => {
    console.log(data);
    playTone($((data.btn)), data.pitch, data.wvfrm);
  });
});
