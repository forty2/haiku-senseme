import remove from 'just-remove';

if (!Array.prototype.remove) {
    Array.prototype.remove = function(item) {
        remove(this, [item]);
        return this;
    }
}
