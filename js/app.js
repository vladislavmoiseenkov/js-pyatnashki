var game = {

    area: [],

    generateArea: function() {
        for ( var i = 0; i < 16; i++ ) {
            this.area[i] = {
                number: i + 1,
                isNull: false
            }
            if ( i === 15 ) {
                this.area[i].isNull = true
            }
        }
    },

    deleteArea: function() {
        var container = document.getElementById('container'),
            flexContainer = document.getElementById('flex-container');
        
        container.removeChild(flexContainer);
    },

    moveLeft: function() {
        var nullElement = 0;
        for(var i = 0; i < this.area.length; i++) {
            if( this.area[i].isNull === true ) {
                nullElement = i;
            }
        }

        if ( nullElement === 3 || nullElement === 7 || nullElement === 11 || nullElement === 15 ) {
            return 0;
        } else {
            var tmp = this.area[nullElement];
            this.area[nullElement] = this.area[nullElement + 1];
            this.area[nullElement + 1] = tmp;
        }
    },
    
    moveRight: function() {
        var nullElement = 0;
        for(var i = 0; i < this.area.length; i++) {
            if( this.area[i].isNull === true ) {
                nullElement = i;
            }
        }
        
        if ( nullElement === 0 || nullElement === 4 || nullElement === 8 || nullElement === 12 ) {
            return 0;
        } else {
            var tmp = this.area[nullElement];
            this.area[nullElement] = this.area[nullElement - 1];
            this.area[nullElement - 1] = tmp;
        }
    },

    moveTop: function() {
        var nullElement = 0;
        for ( var i = 0; i < this.area.length; i++ ) {
            if ( this.area[i].isNull === true ) {
                nullElement = i;
            }
        }

        if ( nullElement > 11 ) {
            return 0;
        } else {
            var tmp = this.area[nullElement];
            this.area[nullElement] = this.area[nullElement + 4];
            this.area[nullElement + 4] = tmp;
        }
    },

    moveBottom: function() {
        var nullElement = 0;
        for ( var i = 0; i < this.area.length; i++ ) {
            if ( this.area[i].isNull === true ) {
                nullElement = i;
            }
        }

        if ( nullElement < 4 ) {
            return 0;
        } else {
            var tmp = this.area[nullElement];
            this.area[nullElement] = this.area[nullElement - 4];
            this.area[nullElement - 4] = tmp;
        }
    },

    renderingArea: function () {
        var container = document.getElementById('container'),
            flexContainer = document.createElement('div');
        flexContainer.className = 'flex-container';
        flexContainer.setAttribute('id', 'flex-container');
        container.appendChild(flexContainer);
        
        for(var i = 0; i < this.area.length; i++) {
            var flexElement = document.createElement('div');
            flexElement.className = 'flex-element';
            if(this.area[i].number !== 16) {
                flexElement.innerText = this.area[i].number;
            }
            flexElement.style.order = this.area[i].order;
            flexContainer.appendChild(flexElement);
        }
    },

    randomArea: function() {
        function compareRandom(a, b) {
            return Math.random() - 0.5;
        }

        this.area.sort(compareRandom);
    },

    checkWin: function() {
        for(var i = 0; i < this.area.length; i++) {
            if ( ( i !== this.area[i].number - 1 ) ) {
                return 0;
            }
        }
        alert('Congratulations!!!');
    },

    start: function() {
        game.generateArea();
        game.randomArea();
        game.renderingArea();
    }
};


game.start();

document.onkeydown = function (e) {

    var LEFT_ARROW = 37,
        RIGHT_ARROW = 39,
        TOP_ARROW = 38,
        BOTTOM_ARROW = 40;

    switch(+e.keyCode) {
        case LEFT_ARROW:
            game.moveLeft();
            game.deleteArea();
            game.renderingArea();
            game.checkWin();
            break;
        case TOP_ARROW:
            game.moveTop();
            game.deleteArea();
            game.renderingArea();
            game.checkWin();
            break;
        case RIGHT_ARROW:
            game.moveRight();
            game.deleteArea();
            game.renderingArea();
            game.checkWin();
            break;
        case BOTTOM_ARROW: 
            game.moveBottom();
            game.deleteArea();
            game.renderingArea();
            game.checkWin();
            break;
        default: 
            break;
    }
};