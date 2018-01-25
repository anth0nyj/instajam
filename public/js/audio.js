// Pitches: Move up and down octaves by doubling and halving values, respectively.
// A4: 440Hz; B4: 493.88; C5: 523.25; D5: 587.33; E5: 659.25; F5: 698.46; G5: 783.99; A5: 880.00; B5: 987.77; C6: 1046.50

// Available waveforms: 'sine', 'square', 'sawtooth', 'triangle'

$(() => {

  const $soundPad = $('<div>').attr('id', 'sound-pad');
  $('#headline').after($soundPad);
  const $allBtns = $('<div>').attr('id', 'all-btns');
  $soundPad.append($allBtns);
  for (i = 1; i <= 16; i++) {
    const $btn = $('<div>').attr('id', 'btn-' + i).addClass('btn');
    $allBtns.append($btn);
  }
});

const context = new AudioContext();

const oscillator = context.createOscillator();
const gain = context.createGain();

// oscillator.connect(context.destination);
oscillator.connect(gain);
gain.connect(context.destination);
oscillator.frequency.value = 440;
oscillator.type = 'triangle';

// gain.volume.value = 0;
oscillator.start(0);
