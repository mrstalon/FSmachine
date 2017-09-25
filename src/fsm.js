class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */

    constructor(config) {
        this.state = config.initial;
        this.configIn = config;
        this.normalState = config.states.normal;
        this.hungryState = config.states.hungry;
        this.sleepingState = config.states.sleeping;
        this.busyState = config.states.busy;
        this.historyOfTransitions = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state === 'hungry') {
            this.historyOfTransitions.push(state);
            this.state = state;
        } else if (state === 'normal') {
            this.historyOfTransitions.push(state);
            this.state = state;
        } else if (state === 'sleeping') {
            this.historyOfTransitions.push(state);
            this.state = state;
        } else if (state === 'busy') {
            this.historyOfTransitions.push(state);
            this.state = state;
        } else {
            throwError();
        }

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.state === 'busy') {
            if (event === 'get_tired') {
                this.historyOfTransitions.push('sleeping');
                this.state = 'sleeping';
            } else if (event === 'get_hungry') {
                this.historyOfTransitions.push('hungry');
                this.state = 'hungry'
            } else {
                throwError();
            }
        } else if (this.state === 'hungry') {
            if (event === 'eat') {
                this.historyOfTransitions.push('normal');
                this.state = 'normal';
            } else {
                throwError();
            }
        } else if (this.state === 'normal') {
            if (event === 'study') {
                this.historyOfTransitions.push('busy');
                this.state = 'busy';
            } else {
                throwError();
            }
        } else if (this.state === 'sleeping') {
            if (event === 'get_up') {
                this.historyOfTransitions.push('normal');
                this.state = 'normal';
            } else if (event === 'get_hungry') {
                this.historyOfTransitions.push('hungry');
                this.state = 'hungry';
            } else {
                throwError();
            }
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.configIn.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) {
            return ['normal', 'busy', 'hungry', 'sleeping'];
        } else if (event === 'get_tired') {
            return ['busy'];
        } else if (event === 'get_hungry') {
            return ['busy', 'sleeping'];
        } else if (event === 'study') {
            return ['normal'];
        } else if (event === 'eat') {
            return ['hungry'];
        } else if (event === 'get_up') {
            return ['sleeping'];
        } else {
            return [];
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
            if(this.state ==='normal' || this.historyOfTransitions.length === 0){
                return false;
            }else if(this.state === 'sleeping'){
                this.historyOfTransitions.push('busy');
                this.state = 'busy';
                return true;
            }else if(this.state === 'busy'){
                this.historyOfTransitions.push('normal');
                this.state = 'normal';
                return true;
            }else if(this.state === 'hungry'){
                if(this.historyOfTransitions[this.historyOfTransitions.length-2]=== 'sleeping'){
                    this.historyOfTransitions.push('sleeping');
                    this.state = 'sleeping';
                    return true;
                }else if(this.historyOfTransitions[this.historyOfTransitions.length-2] === 'busy'){
                    this.historyOfTransitions.push('busy');
                    this.state = 'busy';
                    return true;
                }else if(this.historyOfTransitions.length===1){
                    this.historyOfTransitions.push('normal');
                    this.state = 'normal';
                    return true;
                }
            }


    }



    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.historyOfTransitions.length === 0){
            return false;
        }else{
            if(this.historyOfTransitions[this.historyOfTransitions.length-2]=== 'normal'){
                return false;
            }else{
                if(this.state === 'busy' && this.historyOfTransitions[this.historyOfTransitions.length-2]=== undefined){
                    return false;
                }else{
                    this.state = this.historyOfTransitions[this.historyOfTransitions.length-2];
                    this.historyOfTransitions.pop();
                    return true;
                }

            }
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.historyOfTransitions.length = 0;
    }
}


module.exports = FSM;

/** @Created by Uladzimir Halushka **/
