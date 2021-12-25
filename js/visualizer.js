window.onload = function() {
    new Visualizer().ini();
};

var Visualizer = function() {
    this.audioContext = null;
    this.source = null;
    this.animationId = null;
    this.status = 0;
    this.forceStop = false;
    this.allCapsReachBottom = false;
};

Visualizer.prototype = {
    ini: function() {
        this._prepareAPI();
        this._visualize();
    },
    
    _prepareAPI: function() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
        try {
            this.audioContext = new AudioContext();
        } catch (e) {
            window.alert("Your browser does not support AudioContext :/");
            console.log(e);
        }
    },
    _visualize: function() {
        var myAudio = document.getElementById("Audio");
        var audioContext = this.audioContext
        var analyser = audioContext.createAnalyser();
        var audioSrc = audioContext.createMediaElementSource(myAudio);
        var audioBufferSouceNode = audioContext.createBufferSource(),
        that = this;
        audioSrc.connect(analyser);
        analyser.connect(audioContext.destination);
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        audioBufferSouceNode.start(0);
        this.status = 1;
        audioBufferSouceNode.onended = function() {
            that._audioEnd();
        };
        this._drawSpectrum(analyser);
    },
    
    _drawSpectrum: function(analyser) {
        var that = this,
            canvas = document.getElementById('visualizer'),
            cwidth = canvas.width,
            cheight = canvas.height - 2,
            meterWidth = 10,
            gap = 2,
            capHeight = 2,
            capStyle = '#fff',
            meterNum = 800 / (1 + 2),
            capYPositionArray = [];
        ctx = canvas.getContext('2d'),
        gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(1, '#0f0');
        gradient.addColorStop(0.5, '#ff0');
        gradient.addColorStop(0, '#f00');
        var drawMeter = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            if (that.status === 0) {
                for (var i = array.length - 1; i >= 0; i--) {
                    array[i] = 0;
                };
                allCapsReachBottom = true;
                for (var i = capYPositionArray.length - 1; i >= 0; i--) {
                    allCapsReachBottom = allCapsReachBottom && (capYPositionArray[i] === 0);
                };
                if (allCapsReachBottom) {
                    cancelAnimationFrame(that.animationId);
                    return;
                };
            };
            var step = Math.round(array.length / meterNum);
            ctx.clearRect(0, 0, cwidth, cheight);
            for (var i = 0; i < meterNum; i++) {
                var value = array[i * step];
                if (capYPositionArray.length < Math.round(meterNum)) {
                    capYPositionArray.push(value);
                };
                ctx.fillStyle = capStyle;
                if (value < capYPositionArray[i]) {
                    ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
                } else {
                    ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                    capYPositionArray[i] = value;
                };
                ctx.fillStyle = gradient;
                ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight);
            }
            that.animationId = requestAnimationFrame(drawMeter);
        }
        this.animationId = requestAnimationFrame(drawMeter);
    },
    _audioEnd: function() {
        if (this.forceStop) {
            this.forceStop = false;
            this.status = 1;
            return;
        };
        this.status = 0;
    }
}