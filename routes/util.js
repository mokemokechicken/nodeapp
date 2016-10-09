/**
 * Created by ken on 2016/10/09.
 */


function wrap_promise(next, pr) {
    pr.catch(next);
}

module.exports.wrap_promise = wrap_promise;
