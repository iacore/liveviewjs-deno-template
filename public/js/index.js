// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

var O = Object.create;
var P = Object.defineProperty;
var _ = Object.getOwnPropertyDescriptor;
var W = Object.getOwnPropertyNames;
var x = Object.getPrototypeOf, z = Object.prototype.hasOwnProperty;
var B = (r, n)=>()=>(n || r((n = {
            exports: {}
        }).exports, n), n.exports), R = (r, n)=>{
    for(var a in n)P(r, a, {
        get: n[a],
        enumerable: !0
    });
}, b = (r, n, a, d)=>{
    if (n && typeof n == "object" || typeof n == "function") for (let p of W(n))!z.call(r, p) && p !== a && P(r, p, {
        get: ()=>n[p],
        enumerable: !(d = _(n, p)) || d.enumerable
    });
    return r;
}, y = (r, n, a)=>(b(r, n, "default"), a && b(a, n, "default")), M = (r, n, a)=>(a = r != null ? O(x(r)) : {}, b(n || !r || !r.__esModule ? P(a, "default", {
        value: r,
        enumerable: !0
    }) : a, r));
var C = B((k, U)=>{
    (function(r, n) {
        typeof define == "function" && define.amd ? define(n) : typeof k == "object" ? U.exports = n() : r.NProgress = n();
    })(k, function() {
        var r = {};
        r.version = "0.2.0";
        var n = r.settings = {
            minimum: .08,
            easing: "ease",
            positionUsing: "",
            speed: 200,
            trickle: !0,
            trickleRate: .02,
            trickleSpeed: 800,
            showSpinner: !0,
            barSelector: '[role="bar"]',
            spinnerSelector: '[role="spinner"]',
            parent: "body",
            template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        };
        r.configure = function(e) {
            var t, i;
            for(t in e)i = e[t], i !== void 0 && e.hasOwnProperty(t) && (n[t] = i);
            return this;
        }, r.status = null, r.set = function(e) {
            var t = r.isStarted();
            e = a(e, n.minimum, 1), r.status = e === 1 ? null : e;
            var i = r.render(!t), o = i.querySelector(n.barSelector), u = n.speed, l = n.easing;
            return i.offsetWidth, L(function(s) {
                n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), h(o, p(e, u, l)), e === 1 ? (h(i, {
                    transition: "none",
                    opacity: 1
                }), i.offsetWidth, setTimeout(function() {
                    h(i, {
                        transition: "all " + u + "ms linear",
                        opacity: 0
                    }), setTimeout(function() {
                        r.remove(), s();
                    }, u);
                }, u)) : setTimeout(s, u);
            }), this;
        }, r.isStarted = function() {
            return typeof r.status == "number";
        }, r.start = function() {
            r.status || r.set(0);
            var e = function() {
                setTimeout(function() {
                    r.status && (r.trickle(), e());
                }, n.trickleSpeed);
            };
            return n.trickle && e(), this;
        }, r.done = function(e) {
            return !e && !r.status ? this : r.inc(.3 + .5 * Math.random()).set(1);
        }, r.inc = function(e) {
            var t = r.status;
            return t ? (typeof e != "number" && (e = (1 - t) * a(Math.random() * t, .1, .95)), t = a(t + e, 0, .994), r.set(t)) : r.start();
        }, r.trickle = function() {
            return r.inc(Math.random() * n.trickleRate);
        }, function() {
            var e = 0, t = 0;
            r.promise = function(i) {
                return !i || i.state() === "resolved" ? this : (t === 0 && r.start(), e++, t++, i.always(function() {
                    t--, t === 0 ? (e = 0, r.done()) : r.set((e - t) / e);
                }), this);
            };
        }(), r.render = function(e) {
            if (r.isRendered()) return document.getElementById("nprogress");
            w(document.documentElement, "nprogress-busy");
            var t = document.createElement("div");
            t.id = "nprogress", t.innerHTML = n.template;
            var i = t.querySelector(n.barSelector), o = e ? "-100" : d(r.status || 0), u = document.querySelector(n.parent), l;
            return h(i, {
                transition: "all 0 linear",
                transform: "translate3d(" + o + "%,0,0)"
            }), n.showSpinner || (l = t.querySelector(n.spinnerSelector), l && E(l)), u != document.body && w(u, "nprogress-custom-parent"), u.appendChild(t), t;
        }, r.remove = function() {
            N(document.documentElement, "nprogress-busy"), N(document.querySelector(n.parent), "nprogress-custom-parent");
            var e = document.getElementById("nprogress");
            e && E(e);
        }, r.isRendered = function() {
            return !!document.getElementById("nprogress");
        }, r.getPositioningCSS = function() {
            var e = document.body.style, t = "WebkitTransform" in e ? "Webkit" : "MozTransform" in e ? "Moz" : "msTransform" in e ? "ms" : "OTransform" in e ? "O" : "";
            return t + "Perspective" in e ? "translate3d" : t + "Transform" in e ? "translate" : "margin";
        };
        function a(e, t, i) {
            return e < t ? t : e > i ? i : e;
        }
        function d(e) {
            return (-1 + e) * 100;
        }
        function p(e, t, i) {
            var o;
            return n.positionUsing === "translate3d" ? o = {
                transform: "translate3d(" + d(e) + "%,0,0)"
            } : n.positionUsing === "translate" ? o = {
                transform: "translate(" + d(e) + "%,0)"
            } : o = {
                "margin-left": d(e) + "%"
            }, o.transition = "all " + t + "ms " + i, o;
        }
        var L = function() {
            var e = [];
            function t() {
                var i = e.shift();
                i && i(t);
            }
            return function(i) {
                e.push(i), e.length == 1 && t();
            };
        }(), h = function() {
            var e = [
                "Webkit",
                "O",
                "Moz",
                "ms"
            ], t = {};
            function i(s) {
                return s.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(c, f) {
                    return f.toUpperCase();
                });
            }
            function o(s) {
                var c = document.body.style;
                if (s in c) return s;
                for(var f = e.length, v = s.charAt(0).toUpperCase() + s.slice(1), m; f--;)if (m = e[f] + v, m in c) return m;
                return s;
            }
            function u(s) {
                return s = i(s), t[s] || (t[s] = o(s));
            }
            function l(s, c, f) {
                c = u(c), s.style[c] = f;
            }
            return function(s, c) {
                var f = arguments, v, m;
                if (f.length == 2) for(v in c)m = c[v], m !== void 0 && c.hasOwnProperty(v) && l(s, v, m);
                else l(s, f[1], f[2]);
            };
        }();
        function T(e, t) {
            var i = typeof e == "string" ? e : S(e);
            return i.indexOf(" " + t + " ") >= 0;
        }
        function w(e, t) {
            var i = S(e), o = i + t;
            T(i, t) || (e.className = o.substring(1));
        }
        function N(e, t) {
            var i = S(e), o;
            T(e, t) && (o = i.replace(" " + t + " ", " "), e.className = o.substring(1, o.length - 1));
        }
        function S(e) {
            return (" " + (e.className || "") + " ").replace(/\s+/gi, " ");
        }
        function E(e) {
            e && e.parentNode && e.parentNode.removeChild(e);
        }
        return r;
    });
});
var g = {};
R(g, {
    default: ()=>A
});
var I = M(C());
y(g, M(C()));
var { default: q , ...j } = I, A = q !== void 0 ? q : j;
var v = (e)=>typeof e == "function" ? e : function() {
        return e;
    }, A1 = typeof self < "u" ? self : null, m = typeof document < "u" ? window : null, T = A1 || m || T, L = "2.0.0", d = {
    connecting: 0,
    open: 1,
    closing: 2,
    closed: 3
}, _1 = 1e4, B1 = 1e3, u = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
}, p = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
}, k = {
    longpoll: "longpoll",
    websocket: "websocket"
}, H = {
    complete: 4
}, E = class {
    constructor(e, t, i, s){
        this.channel = e, this.event = t, this.payload = i || function() {
            return {};
        }, this.receivedResp = null, this.timeout = s, this.timeoutTimer = null, this.recHooks = [], this.sent = !1;
    }
    resend(e) {
        this.timeout = e, this.reset(), this.send();
    }
    send() {
        this.hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload(),
            ref: this.ref,
            join_ref: this.channel.joinRef()
        }));
    }
    receive(e, t) {
        return this.hasReceived(e) && t(this.receivedResp.response), this.recHooks.push({
            status: e,
            callback: t
        }), this;
    }
    reset() {
        this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = !1;
    }
    matchReceive({ status: e , response: t , _ref: i  }) {
        this.recHooks.filter((s)=>s.status === e).forEach((s)=>s.callback(t));
    }
    cancelRefEvent() {
        this.refEvent && this.channel.off(this.refEvent);
    }
    cancelTimeout() {
        clearTimeout(this.timeoutTimer), this.timeoutTimer = null;
    }
    startTimeout() {
        this.timeoutTimer && this.cancelTimeout(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, (e)=>{
            this.cancelRefEvent(), this.cancelTimeout(), this.receivedResp = e, this.matchReceive(e);
        }), this.timeoutTimer = setTimeout(()=>{
            this.trigger("timeout", {});
        }, this.timeout);
    }
    hasReceived(e) {
        return this.receivedResp && this.receivedResp.status === e;
    }
    trigger(e, t) {
        this.channel.trigger(this.refEvent, {
            status: e,
            response: t
        });
    }
}, w = class {
    constructor(e, t){
        this.callback = e, this.timerCalc = t, this.timer = null, this.tries = 0;
    }
    reset() {
        this.tries = 0, clearTimeout(this.timer);
    }
    scheduleTimeout() {
        clearTimeout(this.timer), this.timer = setTimeout(()=>{
            this.tries = this.tries + 1, this.callback();
        }, this.timerCalc(this.tries + 1));
    }
}, O1 = class {
    constructor(e, t, i){
        this.state = u.closed, this.topic = e, this.params = v(t || {}), this.socket = i, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = !1, this.joinPush = new E(this, p.join, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new w(()=>{
            this.socket.isConnected() && this.rejoin();
        }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(()=>{
            this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
        })), this.joinPush.receive("ok", ()=>{
            this.state = u.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((s)=>s.send()), this.pushBuffer = [];
        }), this.joinPush.receive("error", ()=>{
            this.state = u.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
        }), this.onClose(()=>{
            this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`), this.state = u.closed, this.socket.remove(this);
        }), this.onError((s)=>{
            this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, s), this.isJoining() && this.joinPush.reset(), this.state = u.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
        }), this.joinPush.receive("timeout", ()=>{
            this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout), new E(this, p.leave, v({}), this.timeout).send(), this.state = u.errored, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
        }), this.on(p.reply, (s, h)=>{
            this.trigger(this.replyEventName(h), s);
        });
    }
    join(e = this.timeout) {
        if (this.joinedOnce) throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
        return this.timeout = e, this.joinedOnce = !0, this.rejoin(), this.joinPush;
    }
    onClose(e) {
        this.on(p.close, e);
    }
    onError(e) {
        return this.on(p.error, (t)=>e(t));
    }
    on(e, t) {
        let i = this.bindingRef++;
        return this.bindings.push({
            event: e,
            ref: i,
            callback: t
        }), i;
    }
    off(e, t) {
        this.bindings = this.bindings.filter((i)=>!(i.event === e && (typeof t > "u" || t === i.ref)));
    }
    canPush() {
        return this.socket.isConnected() && this.isJoined();
    }
    push(e, t, i = this.timeout) {
        if (t = t || {}, !this.joinedOnce) throw new Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
        let s = new E(this, e, function() {
            return t;
        }, i);
        return this.canPush() ? s.send() : (s.startTimeout(), this.pushBuffer.push(s)), s;
    }
    leave(e = this.timeout) {
        this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = u.leaving;
        let t = ()=>{
            this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(p.close, "leave");
        }, i = new E(this, p.leave, v({}), e);
        return i.receive("ok", ()=>t()).receive("timeout", ()=>t()), i.send(), this.canPush() || i.trigger("ok", {}), i;
    }
    onMessage(e, t, i) {
        return t;
    }
    isMember(e, t, i, s) {
        return this.topic !== e ? !1 : s && s !== this.joinRef() ? (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", {
            topic: e,
            event: t,
            payload: i,
            joinRef: s
        }), !1) : !0;
    }
    joinRef() {
        return this.joinPush.ref;
    }
    rejoin(e = this.timeout) {
        this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = u.joining, this.joinPush.resend(e));
    }
    trigger(e, t, i, s) {
        let h = this.onMessage(e, t, i, s);
        if (t && !h) throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
        let o = this.bindings.filter((r)=>r.event === e);
        for(let r = 0; r < o.length; r++)o[r].callback(h, i, s || this.joinRef());
    }
    replyEventName(e) {
        return `chan_reply_${e}`;
    }
    isClosed() {
        return this.state === u.closed;
    }
    isErrored() {
        return this.state === u.errored;
    }
    isJoined() {
        return this.state === u.joined;
    }
    isJoining() {
        return this.state === u.joining;
    }
    isLeaving() {
        return this.state === u.leaving;
    }
}, y1 = class {
    static request(e, t, i, s, h, o, r) {
        if (T.XDomainRequest) {
            let n = new T.XDomainRequest;
            return this.xdomainRequest(n, e, t, s, h, o, r);
        } else {
            let n = new T.XMLHttpRequest;
            return this.xhrRequest(n, e, t, i, s, h, o, r);
        }
    }
    static xdomainRequest(e, t, i, s, h, o, r) {
        return e.timeout = h, e.open(t, i), e.onload = ()=>{
            let n = this.parseJSON(e.responseText);
            r && r(n);
        }, o && (e.ontimeout = o), e.onprogress = ()=>{}, e.send(s), e;
    }
    static xhrRequest(e, t, i, s, h, o, r, n) {
        return e.open(t, i, !0), e.timeout = o, e.setRequestHeader("Content-Type", s), e.onerror = ()=>n && n(null), e.onreadystatechange = ()=>{
            if (e.readyState === H.complete && n) {
                let a = this.parseJSON(e.responseText);
                n(a);
            }
        }, r && (e.ontimeout = r), e.send(h), e;
    }
    static parseJSON(e) {
        if (!e || e === "") return null;
        try {
            return JSON.parse(e);
        } catch  {
            return console && console.log("failed to parse JSON response", e), null;
        }
    }
    static serialize(e, t) {
        let i = [];
        for(var s in e){
            if (!Object.prototype.hasOwnProperty.call(e, s)) continue;
            let h = t ? `${t}[${s}]` : s, o = e[s];
            typeof o == "object" ? i.push(this.serialize(o, h)) : i.push(encodeURIComponent(h) + "=" + encodeURIComponent(o));
        }
        return i.join("&");
    }
    static appendParams(e, t) {
        if (Object.keys(t).length === 0) return e;
        let i = e.match(/\?/) ? "&" : "?";
        return `${e}${i}${this.serialize(t)}`;
    }
}, S = class {
    constructor(e){
        this.endPoint = null, this.token = null, this.skipHeartbeat = !0, this.reqs = new Set, this.awaitingBatchAck = !1, this.currentBatch = null, this.currentBatchTimer = null, this.batchBuffer = [], this.onopen = function() {}, this.onerror = function() {}, this.onmessage = function() {}, this.onclose = function() {}, this.pollEndpoint = this.normalizeEndpoint(e), this.readyState = d.connecting, this.poll();
    }
    normalizeEndpoint(e) {
        return e.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + k.websocket), "$1/" + k.longpoll);
    }
    endpointURL() {
        return y1.appendParams(this.pollEndpoint, {
            token: this.token
        });
    }
    closeAndRetry(e, t, i) {
        this.close(e, t, i), this.readyState = d.connecting;
    }
    ontimeout() {
        this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1);
    }
    isActive() {
        return this.readyState === d.open || this.readyState === d.connecting;
    }
    poll() {
        this.ajax("GET", "application/json", null, ()=>this.ontimeout(), (e)=>{
            if (e) {
                var { status: t , token: i , messages: s  } = e;
                this.token = i;
            } else t = 0;
            switch(t){
                case 200:
                    s.forEach((h)=>{
                        setTimeout(()=>this.onmessage({
                                data: h
                            }), 0);
                    }), this.poll();
                    break;
                case 204:
                    this.poll();
                    break;
                case 410:
                    this.readyState = d.open, this.onopen({}), this.poll();
                    break;
                case 403:
                    this.onerror(403), this.close(1008, "forbidden", !1);
                    break;
                case 0:
                case 500:
                    this.onerror(500), this.closeAndRetry(1011, "internal server error", 500);
                    break;
                default:
                    throw new Error(`unhandled poll status ${t}`);
            }
        });
    }
    send(e) {
        this.currentBatch ? this.currentBatch.push(e) : this.awaitingBatchAck ? this.batchBuffer.push(e) : (this.currentBatch = [
            e
        ], this.currentBatchTimer = setTimeout(()=>{
            this.batchSend(this.currentBatch), this.currentBatch = null;
        }, 0));
    }
    batchSend(e) {
        this.awaitingBatchAck = !0, this.ajax("POST", "application/x-ndjson", e.join(`
`), ()=>this.onerror("timeout"), (t)=>{
            this.awaitingBatchAck = !1, !t || t.status !== 200 ? (this.onerror(t && t.status), this.closeAndRetry(1011, "internal server error", !1)) : this.batchBuffer.length > 0 && (this.batchSend(this.batchBuffer), this.batchBuffer = []);
        });
    }
    close(e, t, i) {
        for (let h of this.reqs)h.abort();
        this.readyState = d.closed;
        let s = Object.assign({
            code: 1e3,
            reason: void 0,
            wasClean: !0
        }, {
            code: e,
            reason: t,
            wasClean: i
        });
        this.batchBuffer = [], clearTimeout(this.currentBatchTimer), this.currentBatchTimer = null, typeof CloseEvent < "u" ? this.onclose(new CloseEvent("close", s)) : this.onclose(s);
    }
    ajax(e, t, i, s, h) {
        let o, r = ()=>{
            this.reqs.delete(o), s();
        };
        o = y1.request(e, this.endpointURL(), t, i, this.timeout, r, (n)=>{
            this.reqs.delete(o), this.isActive() && h(n);
        }), this.reqs.add(o);
    }
}, R1 = class {
    constructor(e, t = {}){
        let i = t.events || {
            state: "presence_state",
            diff: "presence_diff"
        };
        this.state = {}, this.pendingDiffs = [], this.channel = e, this.joinRef = null, this.caller = {
            onJoin: function() {},
            onLeave: function() {},
            onSync: function() {}
        }, this.channel.on(i.state, (s)=>{
            let { onJoin: h , onLeave: o , onSync: r  } = this.caller;
            this.joinRef = this.channel.joinRef(), this.state = R1.syncState(this.state, s, h, o), this.pendingDiffs.forEach((n)=>{
                this.state = R1.syncDiff(this.state, n, h, o);
            }), this.pendingDiffs = [], r();
        }), this.channel.on(i.diff, (s)=>{
            let { onJoin: h , onLeave: o , onSync: r  } = this.caller;
            this.inPendingSyncState() ? this.pendingDiffs.push(s) : (this.state = R1.syncDiff(this.state, s, h, o), r());
        });
    }
    onJoin(e) {
        this.caller.onJoin = e;
    }
    onLeave(e) {
        this.caller.onLeave = e;
    }
    onSync(e) {
        this.caller.onSync = e;
    }
    list(e) {
        return R1.list(this.state, e);
    }
    inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel.joinRef();
    }
    static syncState(e, t, i, s) {
        let h = this.clone(e), o = {}, r = {};
        return this.map(h, (n, a)=>{
            t[n] || (r[n] = a);
        }), this.map(t, (n, a)=>{
            let l = h[n];
            if (l) {
                let c = a.metas.map((g)=>g.phx_ref), f = l.metas.map((g)=>g.phx_ref), C = a.metas.filter((g)=>f.indexOf(g.phx_ref) < 0), b = l.metas.filter((g)=>c.indexOf(g.phx_ref) < 0);
                C.length > 0 && (o[n] = a, o[n].metas = C), b.length > 0 && (r[n] = this.clone(l), r[n].metas = b);
            } else o[n] = a;
        }), this.syncDiff(h, {
            joins: o,
            leaves: r
        }, i, s);
    }
    static syncDiff(e, t, i, s) {
        let { joins: h , leaves: o  } = this.clone(t);
        return i || (i = function() {}), s || (s = function() {}), this.map(h, (r, n)=>{
            let a = e[r];
            if (e[r] = this.clone(n), a) {
                let l = e[r].metas.map((f)=>f.phx_ref), c = a.metas.filter((f)=>l.indexOf(f.phx_ref) < 0);
                e[r].metas.unshift(...c);
            }
            i(r, a, n);
        }), this.map(o, (r, n)=>{
            let a = e[r];
            if (!a) return;
            let l = n.metas.map((c)=>c.phx_ref);
            a.metas = a.metas.filter((c)=>l.indexOf(c.phx_ref) < 0), s(r, a, n), a.metas.length === 0 && delete e[r];
        }), e;
    }
    static list(e, t) {
        return t || (t = function(i, s) {
            return s;
        }), this.map(e, (i, s)=>t(i, s));
    }
    static map(e, t) {
        return Object.getOwnPropertyNames(e).map((i)=>t(i, e[i]));
    }
    static clone(e) {
        return JSON.parse(JSON.stringify(e));
    }
}, j1 = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: {
        push: 0,
        reply: 1,
        broadcast: 2
    },
    encode (e, t) {
        if (e.payload.constructor === ArrayBuffer) return t(this.binaryEncode(e));
        {
            let i = [
                e.join_ref,
                e.ref,
                e.topic,
                e.event,
                e.payload
            ];
            return t(JSON.stringify(i));
        }
    },
    decode (e, t) {
        if (e.constructor === ArrayBuffer) return t(this.binaryDecode(e));
        {
            let [i, s, h, o, r] = JSON.parse(e);
            return t({
                join_ref: i,
                ref: s,
                topic: h,
                event: o,
                payload: r
            });
        }
    },
    binaryEncode (e) {
        let { join_ref: t , ref: i , event: s , topic: h , payload: o  } = e, r = this.META_LENGTH + t.length + i.length + h.length + s.length, n = new ArrayBuffer(this.HEADER_LENGTH + r), a = new DataView(n), l = 0;
        a.setUint8(l++, this.KINDS.push), a.setUint8(l++, t.length), a.setUint8(l++, i.length), a.setUint8(l++, h.length), a.setUint8(l++, s.length), Array.from(t, (f)=>a.setUint8(l++, f.charCodeAt(0))), Array.from(i, (f)=>a.setUint8(l++, f.charCodeAt(0))), Array.from(h, (f)=>a.setUint8(l++, f.charCodeAt(0))), Array.from(s, (f)=>a.setUint8(l++, f.charCodeAt(0)));
        var c = new Uint8Array(n.byteLength + o.byteLength);
        return c.set(new Uint8Array(n), 0), c.set(new Uint8Array(o), n.byteLength), c.buffer;
    },
    binaryDecode (e) {
        let t = new DataView(e), i = t.getUint8(0), s = new TextDecoder;
        switch(i){
            case this.KINDS.push:
                return this.decodePush(e, t, s);
            case this.KINDS.reply:
                return this.decodeReply(e, t, s);
            case this.KINDS.broadcast:
                return this.decodeBroadcast(e, t, s);
        }
    },
    decodePush (e, t, i) {
        let s = t.getUint8(1), h = t.getUint8(2), o = t.getUint8(3), r = this.HEADER_LENGTH + this.META_LENGTH - 1, n = i.decode(e.slice(r, r + s));
        r = r + s;
        let a = i.decode(e.slice(r, r + h));
        r = r + h;
        let l = i.decode(e.slice(r, r + o));
        r = r + o;
        let c = e.slice(r, e.byteLength);
        return {
            join_ref: n,
            ref: null,
            topic: a,
            event: l,
            payload: c
        };
    },
    decodeReply (e, t, i) {
        let s = t.getUint8(1), h = t.getUint8(2), o = t.getUint8(3), r = t.getUint8(4), n = this.HEADER_LENGTH + this.META_LENGTH, a = i.decode(e.slice(n, n + s));
        n = n + s;
        let l = i.decode(e.slice(n, n + h));
        n = n + h;
        let c = i.decode(e.slice(n, n + o));
        n = n + o;
        let f = i.decode(e.slice(n, n + r));
        n = n + r;
        let C = e.slice(n, e.byteLength), b = {
            status: f,
            response: C
        };
        return {
            join_ref: a,
            ref: l,
            topic: c,
            event: p.reply,
            payload: b
        };
    },
    decodeBroadcast (e, t, i) {
        let s = t.getUint8(1), h = t.getUint8(2), o = this.HEADER_LENGTH + 2, r = i.decode(e.slice(o, o + s));
        o = o + s;
        let n = i.decode(e.slice(o, o + h));
        o = o + h;
        let a = e.slice(o, e.byteLength);
        return {
            join_ref: null,
            ref: null,
            topic: r,
            event: n,
            payload: a
        };
    }
}, x1 = class {
    constructor(e, t = {}){
        this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: []
        }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.timeout = t.timeout || _1, this.transport = t.transport || T.WebSocket || S, this.establishedConnections = 0, this.defaultEncoder = j1.encode.bind(j1), this.defaultDecoder = j1.decode.bind(j1), this.closeWasClean = !1, this.binaryType = t.binaryType || "arraybuffer", this.connectClock = 1, this.transport !== S ? (this.encode = t.encode || this.defaultEncoder, this.decode = t.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder);
        let i = null;
        m && m.addEventListener && (m.addEventListener("pagehide", (s)=>{
            this.conn && (this.disconnect(), i = this.connectClock);
        }), m.addEventListener("pageshow", (s)=>{
            i === this.connectClock && (i = null, this.connect());
        })), this.heartbeatIntervalMs = t.heartbeatIntervalMs || 3e4, this.rejoinAfterMs = (s)=>t.rejoinAfterMs ? t.rejoinAfterMs(s) : [
                1e3,
                2e3,
                5e3
            ][s - 1] || 1e4, this.reconnectAfterMs = (s)=>t.reconnectAfterMs ? t.reconnectAfterMs(s) : [
                10,
                50,
                100,
                150,
                200,
                250,
                500,
                1e3,
                2e3
            ][s - 1] || 5e3, this.logger = t.logger || null, this.longpollerTimeout = t.longpollerTimeout || 2e4, this.params = v(t.params || {}), this.endPoint = `${e}/${k.websocket}`, this.vsn = t.vsn || L, this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new w(()=>{
            this.teardown(()=>this.connect());
        }, this.reconnectAfterMs);
    }
    getLongPollTransport() {
        return S;
    }
    replaceTransport(e) {
        this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.sendBuffer = [], this.conn && (this.conn.close(), this.conn = null), this.transport = e;
    }
    protocol() {
        return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
        let e = y1.appendParams(y1.appendParams(this.endPoint, this.params()), {
            vsn: this.vsn
        });
        return e.charAt(0) !== "/" ? e : e.charAt(1) === "/" ? `${this.protocol()}:${e}` : `${this.protocol()}://${location.host}${e}`;
    }
    disconnect(e, t, i) {
        this.connectClock++, this.closeWasClean = !0, this.reconnectTimer.reset(), this.teardown(e, t, i);
    }
    connect(e) {
        e && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = v(e)), !this.conn && (this.connectClock++, this.closeWasClean = !1, this.conn = new this.transport(this.endPointURL()), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = ()=>this.onConnOpen(), this.conn.onerror = (t)=>this.onConnError(t), this.conn.onmessage = (t)=>this.onConnMessage(t), this.conn.onclose = (t)=>this.onConnClose(t));
    }
    log(e, t, i) {
        this.logger(e, t, i);
    }
    hasLogger() {
        return this.logger !== null;
    }
    onOpen(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.open.push([
            t,
            e
        ]), t;
    }
    onClose(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.close.push([
            t,
            e
        ]), t;
    }
    onError(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.error.push([
            t,
            e
        ]), t;
    }
    onMessage(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.message.push([
            t,
            e
        ]), t;
    }
    ping(e) {
        if (!this.isConnected()) return !1;
        let t = this.makeRef(), i = Date.now();
        this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: t
        });
        let s = this.onMessage((h)=>{
            h.ref === t && (this.off([
                s
            ]), e(Date.now() - i));
        });
        return !0;
    }
    clearHeartbeats() {
        clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
        this.hasLogger() && this.log("transport", `connected to ${this.endPointURL()}`), this.closeWasClean = !1, this.establishedConnections++, this.flushSendBuffer(), this.reconnectTimer.reset(), this.resetHeartbeat(), this.stateChangeCallbacks.open.forEach(([, e])=>e());
    }
    heartbeatTimeout() {
        this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), this.triggerChanError(), this.closeWasClean = !1, this.teardown(()=>this.reconnectTimer.scheduleTimeout(), B1, "heartbeat timeout"));
    }
    resetHeartbeat() {
        this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, this.clearHeartbeats(), this.heartbeatTimer = setTimeout(()=>this.sendHeartbeat(), this.heartbeatIntervalMs));
    }
    teardown(e, t, i) {
        if (!this.conn) return e && e();
        this.waitForBufferDone(()=>{
            this.conn && (t ? this.conn.close(t, i || "") : this.conn.close()), this.waitForSocketClosed(()=>{
                this.conn && (this.conn.onopen = function() {}, this.conn.onerror = function() {}, this.conn.onmessage = function() {}, this.conn.onclose = function() {}, this.conn = null), e && e();
            });
        });
    }
    waitForBufferDone(e, t = 1) {
        if (t === 5 || !this.conn || !this.conn.bufferedAmount) {
            e();
            return;
        }
        setTimeout(()=>{
            this.waitForBufferDone(e, t + 1);
        }, 150 * t);
    }
    waitForSocketClosed(e, t = 1) {
        if (t === 5 || !this.conn || this.conn.readyState === d.closed) {
            e();
            return;
        }
        setTimeout(()=>{
            this.waitForSocketClosed(e, t + 1);
        }, 150 * t);
    }
    onConnClose(e) {
        let t = e && e.code;
        this.hasLogger() && this.log("transport", "close", e), this.triggerChanError(), this.clearHeartbeats(), !this.closeWasClean && t !== 1e3 && this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach(([, i])=>i(e));
    }
    onConnError(e) {
        this.hasLogger() && this.log("transport", e);
        let t = this.transport, i = this.establishedConnections;
        this.stateChangeCallbacks.error.forEach(([, s])=>{
            s(e, t, i);
        }), (t === this.transport || i > 0) && this.triggerChanError();
    }
    triggerChanError() {
        this.channels.forEach((e)=>{
            e.isErrored() || e.isLeaving() || e.isClosed() || e.trigger(p.error);
        });
    }
    connectionState() {
        switch(this.conn && this.conn.readyState){
            case d.connecting:
                return "connecting";
            case d.open:
                return "open";
            case d.closing:
                return "closing";
            default:
                return "closed";
        }
    }
    isConnected() {
        return this.connectionState() === "open";
    }
    remove(e) {
        this.off(e.stateChangeRefs), this.channels = this.channels.filter((t)=>t.joinRef() !== e.joinRef());
    }
    off(e) {
        for(let t in this.stateChangeCallbacks)this.stateChangeCallbacks[t] = this.stateChangeCallbacks[t].filter(([i])=>e.indexOf(i) === -1);
    }
    channel(e, t = {}) {
        let i = new O1(e, t, this);
        return this.channels.push(i), i;
    }
    push(e) {
        if (this.hasLogger()) {
            let { topic: t , event: i , payload: s , ref: h , join_ref: o  } = e;
            this.log("push", `${t} ${i} (${o}, ${h})`, s);
        }
        this.isConnected() ? this.encode(e, (t)=>this.conn.send(t)) : this.sendBuffer.push(()=>this.encode(e, (t)=>this.conn.send(t)));
    }
    makeRef() {
        let e = this.ref + 1;
        return e === this.ref ? this.ref = 0 : this.ref = e, this.ref.toString();
    }
    sendHeartbeat() {
        this.pendingHeartbeatRef && !this.isConnected() || (this.pendingHeartbeatRef = this.makeRef(), this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: this.pendingHeartbeatRef
        }), this.heartbeatTimeoutTimer = setTimeout(()=>this.heartbeatTimeout(), this.heartbeatIntervalMs));
    }
    flushSendBuffer() {
        this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e)=>e()), this.sendBuffer = []);
    }
    onConnMessage(e) {
        this.decode(e.data, (t)=>{
            let { topic: i , event: s , payload: h , ref: o , join_ref: r  } = t;
            o && o === this.pendingHeartbeatRef && (this.clearHeartbeats(), this.pendingHeartbeatRef = null, this.heartbeatTimer = setTimeout(()=>this.sendHeartbeat(), this.heartbeatIntervalMs)), this.hasLogger() && this.log("receive", `${h.status || ""} ${i} ${s} ${o && "(" + o + ")" || ""}`, h);
            for(let n = 0; n < this.channels.length; n++){
                let a = this.channels[n];
                a.isMember(i, s, h, r) && a.trigger(s, h, o, r);
            }
            for(let n = 0; n < this.stateChangeCallbacks.message.length; n++){
                let [, a] = this.stateChangeCallbacks.message[n];
                a(t);
            }
        });
    }
    leaveOpenTopic(e) {
        let t = this.channels.find((i)=>i.topic === e && (i.isJoined() || i.isJoining()));
        t && (this.hasLogger() && this.log("transport", `leaving duplicate topic "${e}"`), t.leave());
    }
};
var w1 = Object.create;
var p1 = Object.defineProperty;
var E1 = Object.getOwnPropertyDescriptor;
var y2 = Object.getOwnPropertyNames;
var C1 = Object.getPrototypeOf, _2 = Object.prototype.hasOwnProperty;
var k1 = (n, e)=>()=>(e || n((e = {
            exports: {}
        }).exports, e), e.exports), A2 = (n, e)=>{
    for(var r in e)p1(n, r, {
        get: e[r],
        enumerable: !0
    });
}, s = (n, e, r, l)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let t of y2(e))!_2.call(n, t) && t !== r && p1(n, t, {
        get: ()=>e[t],
        enumerable: !(l = E1(e, t)) || l.enumerable
    });
    return n;
}, u1 = (n, e, r)=>(s(n, e, "default"), r && s(r, e, "default")), v1 = (n, e, r)=>(r = n != null ? w1(C1(n)) : {}, s(e || !n || !n.__esModule ? p1(r, "default", {
        value: n,
        enumerable: !0
    }) : r, n));
var m1 = k1(()=>{
    "use strict";
    (function() {
        var n = e();
        function e() {
            if (typeof window.CustomEvent == "function") return window.CustomEvent;
            function t(i, a) {
                a = a || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var c = document.createEvent("CustomEvent");
                return c.initCustomEvent(i, a.bubbles, a.cancelable, a.detail), c;
            }
            return t.prototype = window.Event.prototype, t;
        }
        function r(t, i) {
            var a = document.createElement("input");
            return a.type = "hidden", a.name = t, a.value = i, a;
        }
        function l(t, i) {
            var a = t.getAttribute("data-to"), c = r("_method", t.getAttribute("data-method")), h = r("_csrf_token", t.getAttribute("data-csrf")), o = document.createElement("form"), f = document.createElement("input"), b = t.getAttribute("target");
            o.method = t.getAttribute("data-method") === "get" ? "get" : "post", o.action = a, o.style.display = "none", b ? o.target = b : i && (o.target = "_blank"), o.appendChild(h), o.appendChild(c), document.body.appendChild(o), f.type = "submit", o.appendChild(f), f.click();
        }
        window.addEventListener("click", function(t) {
            var i = t.target;
            if (!t.defaultPrevented) for(; i && i.getAttribute;){
                var a = new n("phoenix.link.click", {
                    bubbles: !0,
                    cancelable: !0
                });
                if (!i.dispatchEvent(a)) return t.preventDefault(), t.stopImmediatePropagation(), !1;
                if (i.getAttribute("data-method")) return l(i, t.metaKey || t.shiftKey), t.preventDefault(), !1;
                i = i.parentNode;
            }
        }, !1), window.addEventListener("phoenix.link.click", function(t) {
            var i = t.target.getAttribute("data-confirm");
            i && !window.confirm(i) && t.preventDefault();
        }, !1);
    })();
});
var d1 = {};
A2(d1, {
    default: ()=>P1
});
var x2 = v1(m1());
u1(d1, v1(m1()));
var { default: g1 , ...D } = x2, P1 = g1 !== void 0 ? g1 : D;
var mt = "consecutive-reloads", _t = 10, Ct = 5e3, Pt = 1e4, xt = 3e4, vt = [
    "phx-click-loading",
    "phx-change-loading",
    "phx-submit-loading",
    "phx-keydown-loading",
    "phx-keyup-loading",
    "phx-blur-loading",
    "phx-focus-loading"
], D1 = "data-phx-component", Le = "data-phx-link", Tt = "track-static", It = "data-phx-link-state", M1 = "data-phx-ref", q1 = "data-phx-ref-src", bt = "track-uploads", W1 = "data-phx-upload-ref", Xe = "data-phx-preflighted-refs", Lt = "data-phx-done-refs", Ge = "drop-target", Be = "data-phx-active-refs", Se = "phx:live-file:updated", Je = "data-phx-skip", Ye = "data-phx-prune", Qe = "page-loading", Ze = "phx-connected", De = "phx-loading", Re = "phx-no-feedback", et = "phx-error", G = "data-phx-parent-id", qe = "data-phx-main", ae = "data-phx-root-id", Dt = "trigger-action", Ee = "feedback-for", Ve = "phx-has-focused", Rt = [
    "text",
    "textarea",
    "number",
    "email",
    "password",
    "search",
    "tel",
    "url",
    "date",
    "time",
    "datetime-local",
    "color",
    "range"
], yt = [
    "checkbox",
    "radio"
], _e = "phx-has-submitted", X = "data-phx-session", Q = `[${X}]`, tt = "data-phx-sticky", se = "data-phx-static", Oe = "data-phx-readonly", ce = "data-phx-disabled", je = "disable-with", fe = "data-phx-disable-with-restore", Z = "hook", Ot = "debounce", Ht = "throttle", Ce = "update", He = "stream", Nt = "key", O2 = "phxPrivate", it = "auto-recover", pe = "phx:live-socket:debug", Ne = "phx:live-socket:profiling", Fe = "phx:live-socket:latency-sim", Ft = "progress", rt = "mounted", Mt = 1, Ut = 200, $t = "phx-", Bt = 3e4, ee = "debounce-trigger", ge = "throttled", st = "debounce-prev-key", Jt = {
    debounce: 300,
    throttle: 300
}, me = "d", H1 = "s", L1 = "c", nt = "e", at = "r", ot = "t", Vt = "p", jt = "stream", Xt = class {
    constructor(e, t, i){
        this.liveSocket = i, this.entry = e, this.offset = 0, this.chunkSize = t, this.chunkTimer = null, this.uploadChannel = i.channel(`lvu:${e.ref}`, {
            token: e.metadata()
        });
    }
    error(e) {
        clearTimeout(this.chunkTimer), this.uploadChannel.leave(), this.entry.error(e);
    }
    upload() {
        this.uploadChannel.onError((e)=>this.error(e)), this.uploadChannel.join().receive("ok", (e)=>this.readNextChunk()).receive("error", (e)=>this.error(e));
    }
    isDone() {
        return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
        let e = new window.FileReader, t = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
        e.onload = (i)=>{
            if (i.target.error === null) this.offset += i.target.result.byteLength, this.pushChunk(i.target.result);
            else return P2("Read error: " + i.target.error);
        }, e.readAsArrayBuffer(t);
    }
    pushChunk(e) {
        this.uploadChannel.isJoined() && this.uploadChannel.push("chunk", e).receive("ok", ()=>{
            this.entry.progress(this.offset / this.entry.file.size * 100), this.isDone() || (this.chunkTimer = setTimeout(()=>this.readNextChunk(), this.liveSocket.getLatencySim() || 0));
        });
    }
}, P2 = (e, t)=>console.error && console.error(e, t), V = (e)=>{
    let t = typeof e;
    return t === "number" || t === "string" && /^(0|[1-9]\d*)$/.test(e);
};
function qt() {
    let e = new Set, t = document.querySelectorAll("*[id]");
    for(let i = 0, r = t.length; i < r; i++)e.has(t[i].id) ? console.error(`Multiple IDs detected: ${t[i].id}. Ensure unique element ids.`) : e.add(t[i].id);
}
var Wt = (e, t, i, r)=>{
    e.liveSocket.isDebugEnabled() && console.log(`${e.id} ${t}: ${i} - `, r);
}, Me = (e)=>typeof e == "function" ? e : function() {
        return e;
    }, ke = (e)=>JSON.parse(JSON.stringify(e)), ne = (e, t, i)=>{
    do {
        if (e.matches(`[${t}]`) && !e.disabled) return e;
        e = e.parentElement || e.parentNode;
    }while (e !== null && e.nodeType === 1 && !(i && i.isSameNode(e) || e.matches(Q)))
    return null;
}, te = (e)=>e !== null && typeof e == "object" && !(e instanceof Array), Kt = (e, t)=>JSON.stringify(e) === JSON.stringify(t), lt = (e)=>{
    for(let t in e)return !1;
    return !0;
}, j2 = (e, t)=>e && t(e), zt = function(e, t, i, r) {
    e.forEach((s)=>{
        new Xt(s, i.config.chunk_size, r).upload();
    });
}, wt = {
    canPushState () {
        return typeof history.pushState < "u";
    },
    dropLocal (e, t, i) {
        return e.removeItem(this.localKey(t, i));
    },
    updateLocal (e, t, i, r, s) {
        let n = this.getLocal(e, t, i), a = this.localKey(t, i), o = n === null ? r : s(n);
        return e.setItem(a, JSON.stringify(o)), o;
    },
    getLocal (e, t, i) {
        return JSON.parse(e.getItem(this.localKey(t, i)));
    },
    updateCurrentState (e) {
        this.canPushState() && history.replaceState(e(history.state || {}), "", window.location.href);
    },
    pushState (e, t, i) {
        if (this.canPushState()) {
            if (i !== window.location.href) {
                if (t.type == "redirect" && t.scroll) {
                    let s = history.state || {};
                    s.scroll = t.scroll, history.replaceState(s, "", window.location.href);
                }
                delete t.scroll, history[e + "State"](t, "", i || null);
                let r = this.getHashTargetEl(window.location.hash);
                r ? r.scrollIntoView() : t.type === "redirect" && window.scroll(0, 0);
            }
        } else this.redirect(i);
    },
    setCookie (e, t) {
        document.cookie = `${e}=${t}`;
    },
    getCookie (e) {
        return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${e}s*=s*([^;]*).*$)|^.*$`), "$1");
    },
    redirect (e, t) {
        t && wt.setCookie("__phoenix_flash__", t + "; max-age=60000; path=/"), window.location = e;
    },
    localKey (e, t) {
        return `${e}-${t}`;
    },
    getHashTargetEl (e) {
        let t = e.toString().substring(1);
        if (t !== "") return document.getElementById(t) || document.querySelector(`a[name="${t}"]`);
    }
}, N = wt, R2 = {
    byId (e) {
        return document.getElementById(e) || P2(`no id found for ${e}`);
    },
    removeClass (e, t) {
        e.classList.remove(t), e.classList.length === 0 && e.removeAttribute("class");
    },
    all (e, t, i) {
        if (!e) return [];
        let r = Array.from(e.querySelectorAll(t));
        return i ? r.forEach(i) : r;
    },
    childNodeLength (e) {
        let t = document.createElement("template");
        return t.innerHTML = e, t.content.childElementCount;
    },
    isUploadInput (e) {
        return e.type === "file" && e.getAttribute(W1) !== null;
    },
    findUploadInputs (e) {
        return this.all(e, `input[type="file"][${W1}]`);
    },
    findComponentNodeList (e, t) {
        return this.filterWithinSameLiveView(this.all(e, `[${D1}="${t}"]`), e);
    },
    isPhxDestroyed (e) {
        return !!(e.id && R2.private(e, "destroyed"));
    },
    wantsNewTab (e) {
        return e.ctrlKey || e.shiftKey || e.metaKey || e.button && e.button === 1 || e.target.getAttribute("target") === "_blank";
    },
    isUnloadableFormSubmit (e) {
        return !e.defaultPrevented && !this.wantsNewTab(e);
    },
    isNewPageHref (e, t) {
        let i;
        try {
            i = new URL(e);
        } catch  {
            try {
                i = new URL(e, t);
            } catch  {
                return !0;
            }
        }
        return i.host === t.host && i.protocol === t.protocol && i.pathname === t.pathname && i.search === t.search ? i.hash === "" && !i.href.endsWith("#") : !0;
    },
    markPhxChildDestroyed (e) {
        this.isPhxChild(e) && e.setAttribute(X, ""), this.putPrivate(e, "destroyed", !0);
    },
    findPhxChildrenInFragment (e, t) {
        let i = document.createElement("template");
        return i.innerHTML = e, this.findPhxChildren(i.content, t);
    },
    isIgnored (e, t) {
        return (e.getAttribute(t) || e.getAttribute("data-phx-update")) === "ignore";
    },
    isPhxUpdate (e, t, i) {
        return e.getAttribute && i.indexOf(e.getAttribute(t)) >= 0;
    },
    findPhxSticky (e) {
        return this.all(e, `[${tt}]`);
    },
    findPhxChildren (e, t) {
        return this.all(e, `${Q}[${G}="${t}"]`);
    },
    findParentCIDs (e, t) {
        let i = new Set(t), r = t.reduce((s, n)=>{
            let a = `[${D1}="${n}"] [${D1}]`;
            return this.filterWithinSameLiveView(this.all(e, a), e).map((o)=>parseInt(o.getAttribute(D1))).forEach((o)=>s.delete(o)), s;
        }, i);
        return r.size === 0 ? new Set(t) : r;
    },
    filterWithinSameLiveView (e, t) {
        return t.querySelector(Q) ? e.filter((i)=>this.withinSameLiveView(i, t)) : e;
    },
    withinSameLiveView (e, t) {
        for(; e = e.parentNode;){
            if (e.isSameNode(t)) return !0;
            if (e.getAttribute(X) !== null) return !1;
        }
    },
    private (e, t) {
        return e[O2] && e[O2][t];
    },
    deletePrivate (e, t) {
        e[O2] && delete e[O2][t];
    },
    putPrivate (e, t, i) {
        e[O2] || (e[O2] = {}), e[O2][t] = i;
    },
    updatePrivate (e, t, i, r) {
        let s = this.private(e, t);
        s === void 0 ? this.putPrivate(e, t, r(i)) : this.putPrivate(e, t, r(s));
    },
    copyPrivates (e, t) {
        t[O2] && (e[O2] = t[O2]);
    },
    putTitle (e) {
        let t = document.querySelector("title");
        if (t) {
            let { prefix: i , suffix: r  } = t.dataset;
            document.title = `${i || ""}${e}${r || ""}`;
        } else document.title = e;
    },
    debounce (e, t, i, r, s, n, a, o) {
        let l = e.getAttribute(i), c = e.getAttribute(s);
        l === "" && (l = r), c === "" && (c = n);
        let u = l || c;
        switch(u){
            case null:
                return o();
            case "blur":
                this.once(e, "debounce-blur") && e.addEventListener("blur", ()=>o());
                return;
            default:
                let v = parseInt(u), m = ()=>c ? this.deletePrivate(e, ge) : o(), f = this.incCycle(e, ee, m);
                if (isNaN(v)) return P2(`invalid throttle/debounce value: ${u}`);
                if (c) {
                    let A = !1;
                    if (t.type === "keydown") {
                        let x = this.private(e, st);
                        this.putPrivate(e, st, t.key), A = x !== t.key;
                    }
                    if (!A && this.private(e, ge)) return !1;
                    o(), this.putPrivate(e, ge, !0), setTimeout(()=>{
                        a() && this.triggerCycle(e, ee);
                    }, v);
                } else setTimeout(()=>{
                    a() && this.triggerCycle(e, ee, f);
                }, v);
                let w = e.form;
                w && this.once(w, "bind-debounce") && w.addEventListener("submit", ()=>{
                    Array.from(new FormData(w).entries(), ([A])=>{
                        let x = w.querySelector(`[name="${A}"]`);
                        this.incCycle(x, ee), this.deletePrivate(x, ge);
                    });
                }), this.once(e, "bind-debounce") && e.addEventListener("blur", ()=>this.triggerCycle(e, ee));
        }
    },
    triggerCycle (e, t, i) {
        let [r, s] = this.private(e, t);
        i || (i = r), i === r && (this.incCycle(e, t), s());
    },
    once (e, t) {
        return this.private(e, t) === !0 ? !1 : (this.putPrivate(e, t, !0), !0);
    },
    incCycle (e, t, i = function() {}) {
        let [r] = this.private(e, t) || [
            0,
            i
        ];
        return r++, this.putPrivate(e, t, [
            r,
            i
        ]), r;
    },
    discardError (e, t, i) {
        let r = t.getAttribute && t.getAttribute(i), s = r && e.querySelector(`[id="${r}"], [name="${r}"], [name="${r}[]"]`);
        s && (this.private(s, Ve) || this.private(s, _e) || t.classList.add(Re));
    },
    resetForm (e, t) {
        Array.from(e.elements).forEach((i)=>{
            let r = `[${t}="${i.id}"],
                   [${t}="${i.name}"],
                   [${t}="${i.name.replace(/\[\]$/, "")}"]`;
            this.deletePrivate(i, Ve), this.deletePrivate(i, _e), this.all(document, r, (s)=>{
                s.classList.add(Re);
            });
        });
    },
    showError (e, t) {
        (e.id || e.name) && this.all(e.form, `[${t}="${e.id}"], [${t}="${e.name}"]`, (i)=>{
            this.removeClass(i, Re);
        });
    },
    isPhxChild (e) {
        return e.getAttribute && e.getAttribute(G);
    },
    isPhxSticky (e) {
        return e.getAttribute && e.getAttribute(tt) !== null;
    },
    firstPhxChild (e) {
        return this.isPhxChild(e) ? e : this.all(e, `[${G}]`)[0];
    },
    dispatchEvent (e, t, i = {}) {
        let s = {
            bubbles: i.bubbles === void 0 ? !0 : !!i.bubbles,
            cancelable: !0,
            detail: i.detail || {}
        }, n = t === "click" ? new MouseEvent("click", s) : new CustomEvent(t, s);
        e.dispatchEvent(n);
    },
    cloneNode (e, t) {
        if (typeof t > "u") return e.cloneNode(!0);
        {
            let i = e.cloneNode(!1);
            return i.innerHTML = t, i;
        }
    },
    mergeAttrs (e, t, i = {}) {
        let r = i.exclude || [], s = i.isIgnored, n = t.attributes;
        for(let o = n.length - 1; o >= 0; o--){
            let l = n[o].name;
            r.indexOf(l) < 0 && e.setAttribute(l, t.getAttribute(l));
        }
        let a = e.attributes;
        for(let o = a.length - 1; o >= 0; o--){
            let l = a[o].name;
            s ? l.startsWith("data-") && !t.hasAttribute(l) && e.removeAttribute(l) : t.hasAttribute(l) || e.removeAttribute(l);
        }
    },
    mergeFocusedInput (e, t) {
        e instanceof HTMLSelectElement || R2.mergeAttrs(e, t, {
            exclude: [
                "value"
            ]
        }), t.readOnly ? e.setAttribute("readonly", !0) : e.removeAttribute("readonly");
    },
    hasSelectionRange (e) {
        return e.setSelectionRange && (e.type === "text" || e.type === "textarea");
    },
    restoreFocus (e, t, i) {
        if (!R2.isTextualInput(e)) return;
        let r = e.matches(":focus");
        e.readOnly && e.blur(), r || e.focus(), this.hasSelectionRange(e) && e.setSelectionRange(t, i);
    },
    isFormInput (e) {
        return /^(?:input|select|textarea)$/i.test(e.tagName) && e.type !== "button";
    },
    syncAttrsToProps (e) {
        e instanceof HTMLInputElement && yt.indexOf(e.type.toLocaleLowerCase()) >= 0 && (e.checked = e.getAttribute("checked") !== null);
    },
    isTextualInput (e) {
        return Rt.indexOf(e.type) >= 0;
    },
    isNowTriggerFormExternal (e, t) {
        return e.getAttribute && e.getAttribute(t) !== null;
    },
    syncPendingRef (e, t, i) {
        let r = e.getAttribute(M1);
        if (r === null) return !0;
        let s = e.getAttribute(q1);
        return R2.isFormInput(e) || e.getAttribute(i) !== null ? (R2.isUploadInput(e) && R2.mergeAttrs(e, t, {
            isIgnored: !0
        }), R2.putPrivate(e, M1, t), !1) : (vt.forEach((n)=>{
            e.classList.contains(n) && t.classList.add(n);
        }), t.setAttribute(M1, r), t.setAttribute(q1, s), !0);
    },
    cleanChildNodes (e, t) {
        if (R2.isPhxUpdate(e, t, [
            "append",
            "prepend"
        ])) {
            let i = [];
            e.childNodes.forEach((r)=>{
                r.id || (r.nodeType === Node.TEXT_NODE && r.nodeValue.trim() === "" || P2(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(r.outerHTML || r.nodeValue).trim()}"

`), i.push(r));
            }), i.forEach((r)=>r.remove());
        }
    },
    replaceRootContainer (e, t, i) {
        let r = new Set([
            "id",
            X,
            se,
            qe,
            ae
        ]);
        if (e.tagName.toLowerCase() === t.toLowerCase()) return Array.from(e.attributes).filter((s)=>!r.has(s.name.toLowerCase())).forEach((s)=>e.removeAttribute(s.name)), Object.keys(i).filter((s)=>!r.has(s.toLowerCase())).forEach((s)=>e.setAttribute(s, i[s])), e;
        {
            let s = document.createElement(t);
            return Object.keys(i).forEach((n)=>s.setAttribute(n, i[n])), r.forEach((n)=>s.setAttribute(n, e.getAttribute(n))), s.innerHTML = e.innerHTML, e.replaceWith(s), s;
        }
    },
    getSticky (e, t, i) {
        let r = (R2.private(e, "sticky") || []).find(([s])=>t === s);
        if (r) {
            let [s, n, a] = r;
            return a;
        } else return typeof i == "function" ? i() : i;
    },
    deleteSticky (e, t) {
        this.updatePrivate(e, "sticky", [], (i)=>i.filter(([r, s])=>r !== t));
    },
    putSticky (e, t, i) {
        let r = i(e);
        this.updatePrivate(e, "sticky", [], (s)=>{
            let n = s.findIndex(([a])=>t === a);
            return n >= 0 ? s[n] = [
                t,
                i,
                r
            ] : s.push([
                t,
                i,
                r
            ]), s;
        });
    },
    applyStickyOperations (e) {
        let t = R2.private(e, "sticky");
        t && t.forEach(([i, r, s])=>this.putSticky(e, i, r));
    }
}, h = R2, Ue = class {
    static isActive(e, t) {
        let i = t._phxRef === void 0, s = e.getAttribute(Be).split(",").indexOf(C2.genFileRef(t)) >= 0;
        return t.size > 0 && (i || s);
    }
    static isPreflighted(e, t) {
        return e.getAttribute(Xe).split(",").indexOf(C2.genFileRef(t)) >= 0 && this.isActive(e, t);
    }
    constructor(e, t, i){
        this.ref = C2.genFileRef(t), this.fileEl = e, this.file = t, this.view = i, this.meta = null, this._isCancelled = !1, this._isDone = !1, this._progress = 0, this._lastProgressSent = -1, this._onDone = function() {}, this._onElUpdated = this.onElUpdated.bind(this), this.fileEl.addEventListener(Se, this._onElUpdated);
    }
    metadata() {
        return this.meta;
    }
    progress(e) {
        this._progress = Math.floor(e), this._progress > this._lastProgressSent && (this._progress >= 100 ? (this._progress = 100, this._lastProgressSent = 100, this._isDone = !0, this.view.pushFileProgress(this.fileEl, this.ref, 100, ()=>{
            C2.untrackFile(this.fileEl, this.file), this._onDone();
        })) : (this._lastProgressSent = this._progress, this.view.pushFileProgress(this.fileEl, this.ref, this._progress)));
    }
    cancel() {
        this._isCancelled = !0, this._isDone = !0, this._onDone();
    }
    isDone() {
        return this._isDone;
    }
    error(e = "failed") {
        this.fileEl.removeEventListener(Se, this._onElUpdated), this.view.pushFileProgress(this.fileEl, this.ref, {
            error: e
        }), C2.clearFiles(this.fileEl);
    }
    onDone(e) {
        this._onDone = ()=>{
            this.fileEl.removeEventListener(Se, this._onElUpdated), e();
        };
    }
    onElUpdated() {
        this.fileEl.getAttribute(Be).split(",").indexOf(this.ref) === -1 && this.cancel();
    }
    toPreflightPayload() {
        return {
            last_modified: this.file.lastModified,
            name: this.file.name,
            relative_path: this.file.webkitRelativePath,
            size: this.file.size,
            type: this.file.type,
            ref: this.ref
        };
    }
    uploader(e) {
        if (this.meta.uploader) {
            let t = e[this.meta.uploader] || P2(`no uploader configured for ${this.meta.uploader}`);
            return {
                name: this.meta.uploader,
                callback: t
            };
        } else return {
            name: "channel",
            callback: zt
        };
    }
    zipPostFlight(e) {
        this.meta = e.entries[this.ref], this.meta || P2(`no preflight upload response returned with ref ${this.ref}`, {
            input: this.fileEl,
            response: e
        });
    }
}, Gt = 0, C2 = class {
    static genFileRef(e) {
        let t = e._phxRef;
        return t !== void 0 ? t : (e._phxRef = (Gt++).toString(), e._phxRef);
    }
    static getEntryDataURL(e, t, i) {
        let r = this.activeFiles(e).find((s)=>this.genFileRef(s) === t);
        i(URL.createObjectURL(r));
    }
    static hasUploadsInProgress(e) {
        let t = 0;
        return h.findUploadInputs(e).forEach((i)=>{
            i.getAttribute(Xe) !== i.getAttribute(Lt) && t++;
        }), t > 0;
    }
    static serializeUploads(e) {
        let t = this.activeFiles(e), i = {};
        return t.forEach((r)=>{
            let s = {
                path: e.name
            }, n = e.getAttribute(W1);
            i[n] = i[n] || [], s.ref = this.genFileRef(r), s.last_modified = r.lastModified, s.name = r.name || s.ref, s.relative_path = r.webkitRelativePath, s.type = r.type, s.size = r.size, i[n].push(s);
        }), i;
    }
    static clearFiles(e) {
        e.value = null, e.removeAttribute(W1), h.putPrivate(e, "files", []);
    }
    static untrackFile(e, t) {
        h.putPrivate(e, "files", h.private(e, "files").filter((i)=>!Object.is(i, t)));
    }
    static trackFiles(e, t, i) {
        if (e.getAttribute("multiple") !== null) {
            let r = t.filter((s)=>!this.activeFiles(e).find((n)=>Object.is(n, s)));
            h.putPrivate(e, "files", this.activeFiles(e).concat(r)), e.value = null;
        } else i && i.files.length > 0 && (e.files = i.files), h.putPrivate(e, "files", t);
    }
    static activeFileInputs(e) {
        let t = h.findUploadInputs(e);
        return Array.from(t).filter((i)=>i.files && this.activeFiles(i).length > 0);
    }
    static activeFiles(e) {
        return (h.private(e, "files") || []).filter((t)=>Ue.isActive(e, t));
    }
    static inputsAwaitingPreflight(e) {
        let t = h.findUploadInputs(e);
        return Array.from(t).filter((i)=>this.filesAwaitingPreflight(i).length > 0);
    }
    static filesAwaitingPreflight(e) {
        return this.activeFiles(e).filter((t)=>!Ue.isPreflighted(e, t));
    }
    constructor(e, t, i){
        this.view = t, this.onComplete = i, this._entries = Array.from(C2.filesAwaitingPreflight(e) || []).map((r)=>new Ue(e, r, t)), this.numEntriesInProgress = this._entries.length;
    }
    entries() {
        return this._entries;
    }
    initAdapterUpload(e, t, i) {
        this._entries = this._entries.map((s)=>(s.zipPostFlight(e), s.onDone(()=>{
                this.numEntriesInProgress--, this.numEntriesInProgress === 0 && this.onComplete();
            }), s));
        let r = this._entries.reduce((s, n)=>{
            let { name: a , callback: o  } = n.uploader(i.uploaders);
            return s[a] = s[a] || {
                callback: o,
                entries: []
            }, s[a].entries.push(n), s;
        }, {});
        for(let s in r){
            let { callback: n , entries: a  } = r[s];
            n(a, t, e, i);
        }
    }
}, Yt = {
    focusMain () {
        let e = document.querySelector("main h1, main, h1");
        if (e) {
            let t = e.tabIndex;
            e.tabIndex = -1, e.focus(), e.tabIndex = t;
        }
    },
    anyOf (e, t) {
        return t.find((i)=>e instanceof i);
    },
    isFocusable (e, t) {
        return e instanceof HTMLAnchorElement && e.rel !== "ignore" || e instanceof HTMLAreaElement && e.href !== void 0 || !e.disabled && this.anyOf(e, [
            HTMLInputElement,
            HTMLSelectElement,
            HTMLTextAreaElement,
            HTMLButtonElement
        ]) || e instanceof HTMLIFrameElement || e.tabIndex > 0 || !t && e.tabIndex === 0 && e.getAttribute("tabindex") !== null && e.getAttribute("aria-hidden") !== "true";
    },
    attemptFocus (e, t) {
        if (this.isFocusable(e, t)) try {
            e.focus();
        } catch  {}
        return !!document.activeElement && document.activeElement.isSameNode(e);
    },
    focusFirstInteractive (e) {
        let t = e.firstElementChild;
        for(; t;){
            if (this.attemptFocus(t, !0) || this.focusFirstInteractive(t, !0)) return !0;
            t = t.nextElementSibling;
        }
    },
    focusFirst (e) {
        let t = e.firstElementChild;
        for(; t;){
            if (this.attemptFocus(t) || this.focusFirst(t)) return !0;
            t = t.nextElementSibling;
        }
    },
    focusLast (e) {
        let t = e.lastElementChild;
        for(; t;){
            if (this.attemptFocus(t) || this.focusLast(t)) return !0;
            t = t.previousElementSibling;
        }
    }
}, Y = Yt, Qt = {
    LiveFileUpload: {
        activeRefs () {
            return this.el.getAttribute(Be);
        },
        preflightedRefs () {
            return this.el.getAttribute(Xe);
        },
        mounted () {
            this.preflightedWas = this.preflightedRefs();
        },
        updated () {
            let e = this.preflightedRefs();
            this.preflightedWas !== e && (this.preflightedWas = e, e === "" && this.__view.cancelSubmit(this.el.form)), this.activeRefs() === "" && (this.el.value = null), this.el.dispatchEvent(new CustomEvent(Se));
        }
    },
    LiveImgPreview: {
        mounted () {
            this.ref = this.el.getAttribute("data-phx-entry-ref"), this.inputEl = document.getElementById(this.el.getAttribute(W1)), C2.getEntryDataURL(this.inputEl, this.ref, (e)=>{
                this.url = e, this.el.src = e;
            });
        },
        destroyed () {
            URL.revokeObjectURL(this.url);
        }
    },
    FocusWrap: {
        mounted () {
            this.focusStart = this.el.firstElementChild, this.focusEnd = this.el.lastElementChild, this.focusStart.addEventListener("focus", ()=>Y.focusLast(this.el)), this.focusEnd.addEventListener("focus", ()=>Y.focusFirst(this.el)), this.el.addEventListener("phx:show-end", ()=>this.el.focus()), window.getComputedStyle(this.el).display !== "none" && Y.focusFirst(this.el);
        }
    }
}, Zt = Qt, ei = class {
    constructor(e, t, i){
        let r = new Set, s = new Set([
            ...t.children
        ].map((a)=>a.id)), n = [];
        Array.from(e.children).forEach((a)=>{
            if (a.id && (r.add(a.id), s.has(a.id))) {
                let o = a.previousElementSibling && a.previousElementSibling.id;
                n.push({
                    elementId: a.id,
                    previousElementId: o
                });
            }
        }), this.containerId = t.id, this.updateType = i, this.elementsToModify = n, this.elementIdsToAdd = [
            ...s
        ].filter((a)=>!r.has(a));
    }
    perform() {
        let e = h.byId(this.containerId);
        this.elementsToModify.forEach((t)=>{
            t.previousElementId ? j2(document.getElementById(t.previousElementId), (i)=>{
                j2(document.getElementById(t.elementId), (r)=>{
                    r.previousElementSibling && r.previousElementSibling.id == i.id || i.insertAdjacentElement("afterend", r);
                });
            }) : j2(document.getElementById(t.elementId), (i)=>{
                i.previousElementSibling == null || e.insertAdjacentElement("afterbegin", i);
            });
        }), this.updateType == "prepend" && this.elementIdsToAdd.reverse().forEach((t)=>{
            j2(document.getElementById(t), (i)=>e.insertAdjacentElement("afterbegin", i));
        });
    }
}, ht = 11;
function ti(e, t) {
    var i = t.attributes, r, s, n, a, o;
    if (!(t.nodeType === ht || e.nodeType === ht)) {
        for(var l = i.length - 1; l >= 0; l--)r = i[l], s = r.name, n = r.namespaceURI, a = r.value, n ? (s = r.localName || s, o = e.getAttributeNS(n, s), o !== a && (r.prefix === "xmlns" && (s = r.name), e.setAttributeNS(n, s, a))) : (o = e.getAttribute(s), o !== a && e.setAttribute(s, a));
        for(var c = e.attributes, u = c.length - 1; u >= 0; u--)r = c[u], s = r.name, n = r.namespaceURI, n ? (s = r.localName || s, t.hasAttributeNS(n, s) || e.removeAttributeNS(n, s)) : t.hasAttribute(s) || e.removeAttribute(s);
    }
}
var ve, ii = "http://www.w3.org/1999/xhtml", I1 = typeof document > "u" ? void 0 : document, ri = !!I1 && "content" in I1.createElement("template"), si = !!I1 && I1.createRange && "createContextualFragment" in I1.createRange();
function ni(e) {
    var t = I1.createElement("template");
    return t.innerHTML = e, t.content.childNodes[0];
}
function ai(e) {
    ve || (ve = I1.createRange(), ve.selectNode(I1.body));
    var t = ve.createContextualFragment(e);
    return t.childNodes[0];
}
function oi(e) {
    var t = I1.createElement("body");
    return t.innerHTML = e, t.childNodes[0];
}
function li(e) {
    return e = e.trim(), ri ? ni(e) : si ? ai(e) : oi(e);
}
function be(e, t) {
    var i = e.nodeName, r = t.nodeName, s, n;
    return i === r ? !0 : (s = i.charCodeAt(0), n = r.charCodeAt(0), s <= 90 && n >= 97 ? i === r.toUpperCase() : n <= 90 && s >= 97 ? r === i.toUpperCase() : !1);
}
function hi(e, t) {
    return !t || t === ii ? I1.createElement(e) : I1.createElementNS(t, e);
}
function di(e, t) {
    for(var i = e.firstChild; i;){
        var r = i.nextSibling;
        t.appendChild(i), i = r;
    }
    return t;
}
function $e(e, t, i) {
    e[i] !== t[i] && (e[i] = t[i], e[i] ? e.setAttribute(i, "") : e.removeAttribute(i));
}
var dt = {
    OPTION: function(e, t) {
        var i = e.parentNode;
        if (i) {
            var r = i.nodeName.toUpperCase();
            r === "OPTGROUP" && (i = i.parentNode, r = i && i.nodeName.toUpperCase()), r === "SELECT" && !i.hasAttribute("multiple") && (e.hasAttribute("selected") && !t.selected && (e.setAttribute("selected", "selected"), e.removeAttribute("selected")), i.selectedIndex = -1);
        }
        $e(e, t, "selected");
    },
    INPUT: function(e, t) {
        $e(e, t, "checked"), $e(e, t, "disabled"), e.value !== t.value && (e.value = t.value), t.hasAttribute("value") || e.removeAttribute("value");
    },
    TEXTAREA: function(e, t) {
        var i = t.value;
        e.value !== i && (e.value = i);
        var r = e.firstChild;
        if (r) {
            var s = r.nodeValue;
            if (s == i || !i && s == e.placeholder) return;
            r.nodeValue = i;
        }
    },
    SELECT: function(e, t) {
        if (!t.hasAttribute("multiple")) {
            for(var i = -1, r = 0, s = e.firstChild, n, a; s;)if (a = s.nodeName && s.nodeName.toUpperCase(), a === "OPTGROUP") n = s, s = n.firstChild;
            else {
                if (a === "OPTION") {
                    if (s.hasAttribute("selected")) {
                        i = r;
                        break;
                    }
                    r++;
                }
                s = s.nextSibling, !s && n && (s = n.nextSibling, n = null);
            }
            e.selectedIndex = i;
        }
    }
}, ie = 1, ut = 11, ct = 3, ft = 8;
function J() {}
function ui(e) {
    if (e) return e.getAttribute && e.getAttribute("id") || e.id;
}
function ci(e) {
    return function(i, r, s) {
        if (s || (s = {}), typeof r == "string") if (i.nodeName === "#document" || i.nodeName === "HTML" || i.nodeName === "BODY") {
            var n = r;
            r = I1.createElement("html"), r.innerHTML = n;
        } else r = li(r);
        else r.nodeType === ut && (r = r.firstElementChild);
        var a = s.getNodeKey || ui, o = s.onBeforeNodeAdded || J, l = s.onNodeAdded || J, c = s.onBeforeElUpdated || J, u = s.onElUpdated || J, v = s.onBeforeNodeDiscarded || J, m = s.onNodeDiscarded || J, f = s.onBeforeElChildrenUpdated || J, w = s.skipFromChildren || J, A = s.addChild || function(g, p) {
            return g.appendChild(p);
        }, x = s.childrenOnly === !0, d = Object.create(null), b = [];
        function E(g) {
            b.push(g);
        }
        function T(g, p) {
            if (g.nodeType === ie) for(var k = g.firstChild; k;){
                var y = void 0;
                p && (y = a(k)) ? E(y) : (m(k), k.firstChild && T(k, p)), k = k.nextSibling;
            }
        }
        function oe(g, p, k) {
            v(g) !== !1 && (p && p.removeChild(g), m(g), T(g, k));
        }
        function We(g) {
            if (g.nodeType === ie || g.nodeType === ut) for(var p = g.firstChild; p;){
                var k = a(p);
                k && (d[k] = p), We(p), p = p.nextSibling;
            }
        }
        We(i);
        function Pe(g) {
            l(g);
            for(var p = g.firstChild; p;){
                var k = p.nextSibling, y = a(p);
                if (y) {
                    var S = d[y];
                    S && be(p, S) ? (p.parentNode.replaceChild(S, p), le(S, p)) : Pe(p);
                } else Pe(p);
                p = k;
            }
        }
        function St(g, p, k) {
            for(; p;){
                var y = p.nextSibling;
                (k = a(p)) ? E(k) : oe(p, g, !0), p = y;
            }
        }
        function le(g, p, k) {
            var y = a(p);
            y && delete d[y], !(!k && (c(g, p) === !1 || (e(g, p), u(g), f(g, p) === !1))) && (g.nodeName !== "TEXTAREA" ? kt(g, p) : dt.TEXTAREA(g, p));
        }
        function kt(g, p) {
            var k = w(g), y = p.firstChild, S = g.firstChild, K, U, z, de, $;
            e: for(; y;){
                for(de = y.nextSibling, K = a(y); !k && S;){
                    if (z = S.nextSibling, y.isSameNode && y.isSameNode(S)) {
                        y = de, S = z;
                        continue e;
                    }
                    U = a(S);
                    var ue = S.nodeType, B = void 0;
                    if (ue === y.nodeType && (ue === ie ? (K ? K !== U && (($ = d[K]) ? z === $ ? B = !1 : (g.insertBefore($, S), U ? E(U) : oe(S, g, !0), S = $) : B = !1) : U && (B = !1), B = B !== !1 && be(S, y), B && le(S, y)) : (ue === ct || ue == ft) && (B = !0, S.nodeValue !== y.nodeValue && (S.nodeValue = y.nodeValue))), B) {
                        y = de, S = z;
                        continue e;
                    }
                    U ? E(U) : oe(S, g, !0), S = z;
                }
                if (K && ($ = d[K]) && be($, y)) k || A(g, $), le($, y);
                else {
                    var Ie = o(y);
                    Ie !== !1 && (Ie && (y = Ie), y.actualize && (y = y.actualize(g.ownerDocument || I1)), A(g, y), Pe(y));
                }
                y = de, S = z;
            }
            St(g, S, U);
            var ze = dt[g.nodeName];
            ze && ze(g, p);
        }
        var _ = i, he = _.nodeType, Ke = r.nodeType;
        if (!x) {
            if (he === ie) Ke === ie ? be(i, r) || (m(i), _ = di(i, hi(r.nodeName, r.namespaceURI))) : _ = r;
            else if (he === ct || he === ft) {
                if (Ke === he) return _.nodeValue !== r.nodeValue && (_.nodeValue = r.nodeValue), _;
                _ = r;
            }
        }
        if (_ === r) m(i);
        else {
            if (r.isSameNode && r.isSameNode(_)) return;
            if (le(_, r, x), b) for(var xe = 0, Et = b.length; xe < Et; xe++){
                var Te = d[b[xe]];
                Te && oe(Te, Te.parentNode, !1);
            }
        }
        return !x && _ !== i && i.parentNode && (_.actualize && (_ = _.actualize(i.ownerDocument || I1)), i.parentNode.replaceChild(_, i)), _;
    };
}
var fi = ci(ti), pt = fi, ye = class {
    static patchEl(e, t, i) {
        pt(e, t, {
            childrenOnly: !1,
            onBeforeElUpdated: (r, s)=>{
                if (i && i.isSameNode(r) && h.isFormInput(r)) return h.mergeFocusedInput(r, s), !1;
            }
        });
    }
    constructor(e, t, i, r, s, n){
        this.view = e, this.liveSocket = e.liveSocket, this.container = t, this.id = i, this.rootID = e.root.id, this.html = r, this.streams = s, this.streamInserts = {}, this.targetCID = n, this.cidPatch = V(this.targetCID), this.pendingRemoves = [], this.phxRemove = this.liveSocket.binding("remove"), this.callbacks = {
            beforeadded: [],
            beforeupdated: [],
            beforephxChildAdded: [],
            afteradded: [],
            afterupdated: [],
            afterdiscarded: [],
            afterphxChildAdded: [],
            aftertransitionsDiscarded: []
        };
    }
    before(e, t) {
        this.callbacks[`before${e}`].push(t);
    }
    after(e, t) {
        this.callbacks[`after${e}`].push(t);
    }
    trackBefore(e, ...t) {
        this.callbacks[`before${e}`].forEach((i)=>i(...t));
    }
    trackAfter(e, ...t) {
        this.callbacks[`after${e}`].forEach((i)=>i(...t));
    }
    markPrunableContentForRemoval() {
        let e = this.liveSocket.binding(Ce);
        h.all(this.container, `[${e}=${He}]`, (t)=>t.innerHTML = ""), h.all(this.container, `[${e}=append] > *, [${e}=prepend] > *`, (t)=>{
            t.setAttribute(Ye, "");
        });
    }
    perform() {
        let { view: e , liveSocket: t , container: i , html: r  } = this, s = this.isCIDPatch() ? this.targetCIDContainer(r) : i;
        if (this.isCIDPatch() && !s) return;
        let n = t.getActiveElement(), { selectionStart: a , selectionEnd: o  } = n && h.hasSelectionRange(n) ? n : {}, l = t.binding(Ce), c = t.binding(Ee), u = t.binding(je), v = t.binding(Dt), m = [], f = [], w = [], A = null, x = t.time("premorph container prep", ()=>this.buildDiffHTML(i, r, l, s));
        return this.trackBefore("added", i), this.trackBefore("updated", i, i), t.time("morphdom", ()=>{
            this.streams.forEach(([d, b])=>{
                this.streamInserts = Object.assign(this.streamInserts, d), b.forEach((E)=>{
                    let T = i.querySelector(`[id="${E}"]`);
                    T && (this.maybePendingRemove(T) || (T.remove(), this.onNodeDiscarded(T)));
                });
            }), pt(s, x, {
                childrenOnly: s.getAttribute(D1) === null,
                getNodeKey: (d)=>h.isPhxDestroyed(d) ? null : d.id,
                skipFromChildren: (d)=>d.getAttribute(l) === He,
                addChild: (d, b)=>{
                    let E = b.id ? this.streamInserts[b.id] : void 0;
                    if (E === void 0) return d.appendChild(b);
                    if (E === 0) d.insertAdjacentElement("afterbegin", b);
                    else if (E === -1) d.appendChild(b);
                    else if (E > 0) {
                        let T = Array.from(d.children)[E];
                        d.insertBefore(b, T);
                    }
                },
                onBeforeNodeAdded: (d)=>(this.trackBefore("added", d), d),
                onNodeAdded: (d)=>{
                    d instanceof HTMLImageElement && d.srcset ? d.srcset = d.srcset : d instanceof HTMLVideoElement && d.autoplay && d.play(), h.isNowTriggerFormExternal(d, v) && (A = d), h.discardError(s, d, c), (h.isPhxChild(d) && e.ownsElement(d) || h.isPhxSticky(d) && e.ownsElement(d.parentNode)) && this.trackAfter("phxChildAdded", d), m.push(d);
                },
                onNodeDiscarded: (d)=>this.onNodeDiscarded(d),
                onBeforeNodeDiscarded: (d)=>d.getAttribute && d.getAttribute(Ye) !== null ? !0 : !(d.parentElement !== null && d.id && h.isPhxUpdate(d.parentElement, l, [
                        He,
                        "append",
                        "prepend"
                    ]) || this.maybePendingRemove(d) || this.skipCIDSibling(d)),
                onElUpdated: (d)=>{
                    h.isNowTriggerFormExternal(d, v) && (A = d), f.push(d), this.maybeReOrderStream(d);
                },
                onBeforeElUpdated: (d, b)=>{
                    if (h.cleanChildNodes(b, l), this.skipCIDSibling(b) || h.isPhxSticky(d)) return !1;
                    if (h.isIgnored(d, l) || d.form && d.form.isSameNode(A)) return this.trackBefore("updated", d, b), h.mergeAttrs(d, b, {
                        isIgnored: !0
                    }), f.push(d), h.applyStickyOperations(d), !1;
                    if (d.type === "number" && d.validity && d.validity.badInput) return !1;
                    if (!h.syncPendingRef(d, b, u)) return h.isUploadInput(d) && (this.trackBefore("updated", d, b), f.push(d)), h.applyStickyOperations(d), !1;
                    if (h.isPhxChild(b)) {
                        let T = d.getAttribute(X);
                        return h.mergeAttrs(d, b, {
                            exclude: [
                                se
                            ]
                        }), T !== "" && d.setAttribute(X, T), d.setAttribute(ae, this.rootID), h.applyStickyOperations(d), !1;
                    }
                    return h.copyPrivates(b, d), h.discardError(s, b, c), n && d.isSameNode(n) && h.isFormInput(d) && d.type !== "hidden" ? (this.trackBefore("updated", d, b), h.mergeFocusedInput(d, b), h.syncAttrsToProps(d), f.push(d), h.applyStickyOperations(d), !1) : (h.isPhxUpdate(b, l, [
                        "append",
                        "prepend"
                    ]) && w.push(new ei(d, b, b.getAttribute(l))), h.syncAttrsToProps(b), h.applyStickyOperations(b), this.trackBefore("updated", d, b), !0);
                }
            });
        }), t.isDebugEnabled() && qt(), w.length > 0 && t.time("post-morph append/prepend restoration", ()=>{
            w.forEach((d)=>d.perform());
        }), t.silenceEvents(()=>h.restoreFocus(n, a, o)), h.dispatchEvent(document, "phx:update"), m.forEach((d)=>this.trackAfter("added", d)), f.forEach((d)=>this.trackAfter("updated", d)), this.transitionPendingRemoves(), A && (t.unload(), A.submit()), !0;
    }
    onNodeDiscarded(e) {
        (h.isPhxChild(e) || h.isPhxSticky(e)) && this.liveSocket.destroyViewByEl(e), this.trackAfter("discarded", e);
    }
    maybePendingRemove(e) {
        return e.getAttribute && e.getAttribute(this.phxRemove) !== null ? (this.pendingRemoves.push(e), !0) : !1;
    }
    maybeReOrderStream(e) {
        let t = e.id ? this.streamInserts[e.id] : void 0;
        if (t !== void 0) {
            if (t === 0) e.parentElement.insertBefore(e, e.parentElement.firstElementChild);
            else if (t > 0) {
                let i = Array.from(e.parentElement.children), r = i.indexOf(e);
                if (t >= i.length - 1) e.parentElement.appendChild(e);
                else {
                    let s = i[t];
                    r > t ? e.parentElement.insertBefore(e, s) : e.parentElement.insertBefore(e, s.nextElementSibling);
                }
            }
        }
    }
    transitionPendingRemoves() {
        let { pendingRemoves: e , liveSocket: t  } = this;
        e.length > 0 && (t.transitionRemoves(e), t.requestDOMUpdate(()=>{
            e.forEach((i)=>{
                let r = h.firstPhxChild(i);
                r && t.destroyViewByEl(r), i.remove();
            }), this.trackAfter("transitionsDiscarded", e);
        }));
    }
    isCIDPatch() {
        return this.cidPatch;
    }
    skipCIDSibling(e) {
        return e.nodeType === Node.ELEMENT_NODE && e.getAttribute(Je) !== null;
    }
    targetCIDContainer(e) {
        if (!this.isCIDPatch()) return;
        let [t, ...i] = h.findComponentNodeList(this.container, this.targetCID);
        return i.length === 0 && h.childNodeLength(e) === 1 ? t : t && t.parentNode;
    }
    buildDiffHTML(e, t, i, r) {
        let s = this.isCIDPatch(), n = s && r.getAttribute(D1) === this.targetCID.toString();
        if (!s || n) return t;
        {
            let a = null, o = document.createElement("template");
            a = h.cloneNode(r);
            let [l, ...c] = h.findComponentNodeList(a, this.targetCID);
            return o.innerHTML = t, c.forEach((u)=>u.remove()), Array.from(a.childNodes).forEach((u)=>{
                u.id && u.nodeType === Node.ELEMENT_NODE && u.getAttribute(D1) !== this.targetCID.toString() && (u.setAttribute(Je, ""), u.innerHTML = "");
            }), Array.from(o.content.childNodes).forEach((u)=>a.insertBefore(u, l)), l.remove(), a.outerHTML;
        }
    }
    indexOf(e, t) {
        return Array.from(e.children).indexOf(t);
    }
}, gt = class {
    static extract(e) {
        let { [at]: t , [nt]: i , [ot]: r  } = e;
        return delete e[at], delete e[nt], delete e[ot], {
            diff: e,
            title: r,
            reply: t || null,
            events: i || []
        };
    }
    constructor(e, t){
        this.viewId = e, this.rendered = {}, this.mergeDiff(t);
    }
    parentViewId() {
        return this.viewId;
    }
    toString(e) {
        let [t, i] = this.recursiveToString(this.rendered, this.rendered[L1], e);
        return [
            t,
            i
        ];
    }
    recursiveToString(e, t = e[L1], i) {
        i = i ? new Set(i) : null;
        let r = {
            buffer: "",
            components: t,
            onlyCids: i,
            streams: new Set
        };
        return this.toOutputBuffer(e, null, r), [
            r.buffer,
            r.streams
        ];
    }
    componentCIDs(e) {
        return Object.keys(e[L1] || {}).map((t)=>parseInt(t));
    }
    isComponentOnlyDiff(e) {
        return e[L1] ? Object.keys(e).length === 1 : !1;
    }
    getComponent(e, t) {
        return e[L1][t];
    }
    mergeDiff(e) {
        let t = e[L1], i = {};
        if (delete e[L1], this.rendered = this.mutableMerge(this.rendered, e), this.rendered[L1] = this.rendered[L1] || {}, t) {
            let r = this.rendered[L1];
            for(let s in t)t[s] = this.cachedFindComponent(s, t[s], r, t, i);
            for(let s in t)r[s] = t[s];
            e[L1] = t;
        }
    }
    cachedFindComponent(e, t, i, r, s) {
        if (s[e]) return s[e];
        {
            let n, a, o = t[H1];
            if (V(o)) {
                let l;
                o > 0 ? l = this.cachedFindComponent(o, r[o], i, r, s) : l = i[-o], a = l[H1], n = this.cloneMerge(l, t), n[H1] = a;
            } else n = t[H1] !== void 0 ? t : this.cloneMerge(i[e] || {}, t);
            return s[e] = n, n;
        }
    }
    mutableMerge(e, t) {
        return t[H1] !== void 0 ? t : (this.doMutableMerge(e, t), e);
    }
    doMutableMerge(e, t) {
        for(let i in t){
            let r = t[i], s = e[i];
            te(r) && r[H1] === void 0 && te(s) ? this.doMutableMerge(s, r) : e[i] = r;
        }
    }
    cloneMerge(e, t) {
        let i = {
            ...e,
            ...t
        };
        for(let r in i){
            let s = t[r], n = e[r];
            te(s) && s[H1] === void 0 && te(n) && (i[r] = this.cloneMerge(n, s));
        }
        return i;
    }
    componentToString(e) {
        let [t, i] = this.recursiveCIDToString(this.rendered[L1], e);
        return [
            t,
            i
        ];
    }
    pruneCIDs(e) {
        e.forEach((t)=>delete this.rendered[L1][t]);
    }
    get() {
        return this.rendered;
    }
    isNewFingerprint(e = {}) {
        return !!e[H1];
    }
    templateStatic(e, t) {
        return typeof e == "number" ? t[e] : e;
    }
    toOutputBuffer(e, t, i) {
        if (e[me]) return this.comprehensionToBuffer(e, t, i);
        let { [H1]: r  } = e;
        r = this.templateStatic(r, t), i.buffer += r[0];
        for(let s = 1; s < r.length; s++)this.dynamicToBuffer(e[s - 1], t, i), i.buffer += r[s];
    }
    comprehensionToBuffer(e, t, i) {
        let { [me]: r , [H1]: s , [jt]: n  } = e, [a, o] = n || [
            {},
            []
        ];
        s = this.templateStatic(s, t);
        let l = t || e[Vt];
        for(let c = 0; c < r.length; c++){
            let u = r[c];
            i.buffer += s[0];
            for(let v = 1; v < s.length; v++)this.dynamicToBuffer(u[v - 1], l, i), i.buffer += s[v];
        }
        n !== void 0 && (e[me].length > 0 || o.length > 0) && (e[me] = [], i.streams.add(n));
    }
    dynamicToBuffer(e, t, i) {
        if (typeof e == "number") {
            let [r, s] = this.recursiveCIDToString(i.components, e, i.onlyCids);
            i.buffer += r, i.streams = new Set([
                ...i.streams,
                ...s
            ]);
        } else te(e) ? this.toOutputBuffer(e, t, i) : i.buffer += e;
    }
    recursiveCIDToString(e, t, i) {
        let r = e[t] || P2(`no component for CID ${t}`, e), s = document.createElement("template"), [n, a] = this.recursiveToString(r, e, i);
        s.innerHTML = n;
        let o = s.content, l = i && !i.has(t), [c, u] = Array.from(o.childNodes).reduce(([v, m], f, w)=>f.nodeType === Node.ELEMENT_NODE ? f.getAttribute(D1) ? [
                v,
                !0
            ] : (f.setAttribute(D1, t), f.id || (f.id = `${this.parentViewId()}-${t}-${w}`), l && (f.setAttribute(Je, ""), f.innerHTML = ""), [
                !0,
                m
            ]) : f.nodeValue.trim() !== "" ? (P2(`only HTML element tags are allowed at the root of components.

got: "${f.nodeValue.trim()}"

within:
`, s.innerHTML.trim()), f.replaceWith(this.createSpan(f.nodeValue, t)), [
                !0,
                m
            ]) : (f.remove(), [
                v,
                m
            ]), [
            !1,
            !1
        ]);
        return !c && !u ? (P2(`expected at least one HTML element tag inside a component, but the component is empty:
`, s.innerHTML.trim()), [
            this.createSpan("", t).outerHTML,
            a
        ]) : !c && u ? (P2("expected at least one HTML element tag directly inside a component, but only subcomponents were found. A component must render at least one HTML tag directly inside itself.", s.innerHTML.trim()), [
            s.innerHTML,
            a
        ]) : [
            s.innerHTML,
            a
        ];
    }
    createSpan(e, t) {
        let i = document.createElement("span");
        return i.innerText = e, i.setAttribute(D1, t), i;
    }
}, pi = 1, re = class {
    static makeID() {
        return pi++;
    }
    static elementID(e) {
        return e.phxHookId;
    }
    constructor(e, t, i){
        this.__view = e, this.liveSocket = e.liveSocket, this.__callbacks = i, this.__listeners = new Set, this.__isDisconnected = !1, this.el = t, this.el.phxHookId = this.constructor.makeID();
        for(let r in this.__callbacks)this[r] = this.__callbacks[r];
    }
    __mounted() {
        this.mounted && this.mounted();
    }
    __updated() {
        this.updated && this.updated();
    }
    __beforeUpdate() {
        this.beforeUpdate && this.beforeUpdate();
    }
    __destroyed() {
        this.destroyed && this.destroyed();
    }
    __reconnected() {
        this.__isDisconnected && (this.__isDisconnected = !1, this.reconnected && this.reconnected());
    }
    __disconnected() {
        this.__isDisconnected = !0, this.disconnected && this.disconnected();
    }
    pushEvent(e, t = {}, i = function() {}) {
        return this.__view.pushHookEvent(null, e, t, i);
    }
    pushEventTo(e, t, i = {}, r = function() {}) {
        return this.__view.withinTargets(e, (s, n)=>s.pushHookEvent(n, t, i, r));
    }
    handleEvent(e, t) {
        let i = (r, s)=>s ? e : t(r.detail);
        return window.addEventListener(`phx:${e}`, i), this.__listeners.add(i), i;
    }
    removeHandleEvent(e) {
        let t = e(null, !0);
        window.removeEventListener(`phx:${t}`, e), this.__listeners.delete(e);
    }
    upload(e, t) {
        return this.__view.dispatchUploads(e, t);
    }
    uploadTo(e, t, i) {
        return this.__view.withinTargets(e, (r)=>r.dispatchUploads(t, i));
    }
    __cleanup__() {
        this.__listeners.forEach((e)=>this.removeHandleEvent(e));
    }
}, we = null, gi = {
    exec (e, t, i, r, s) {
        let [n, a] = s || [
            null,
            {}
        ];
        (t.charAt(0) === "[" ? JSON.parse(t) : [
            [
                n,
                a
            ]
        ]).forEach(([l, c])=>{
            l === n && a.data && (c.data = Object.assign(c.data || {}, a.data)), this.filterToEls(r, c).forEach((u)=>{
                this[`exec_${l}`](e, t, i, r, u, c);
            });
        });
    },
    isVisible (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length > 0);
    },
    exec_exec (e, t, i, r, s, [n, a]) {
        (a ? h.all(document, a) : [
            r
        ]).forEach((l)=>{
            let c = l.getAttribute(n);
            if (!c) throw new Error(`expected ${n} to contain JS command on "${a}"`);
            i.liveSocket.execJS(l, c, e);
        });
    },
    exec_dispatch (e, t, i, r, s, { to: n , event: a , detail: o , bubbles: l  }) {
        o = o || {}, o.dispatcher = r, h.dispatchEvent(s, a, {
            detail: o,
            bubbles: l
        });
    },
    exec_push (e, t, i, r, s, n) {
        if (!i.isConnected()) return;
        let { event: a , data: o , target: l , page_loading: c , loading: u , value: v , dispatcher: m  } = n, f = {
            loading: u,
            value: v,
            target: l,
            page_loading: !!c
        }, w = e === "change" && m ? m : r, A = l || w.getAttribute(i.binding("target")) || w;
        i.withinTargets(A, (x, d)=>{
            if (e === "change") {
                let { newCid: b , _target: E , callback: T  } = n;
                E = E || (h.isFormInput(r) ? r.name : void 0), E && (f._target = E), x.pushInput(r, d, b, a || t, f, T);
            } else if (e === "submit") {
                let { submitter: b  } = n;
                x.submitForm(r, d, a || t, b, f);
            } else x.pushEvent(e, r, d, a || t, o, f);
        });
    },
    exec_navigate (e, t, i, r, s, { href: n , replace: a  }) {
        i.liveSocket.historyRedirect(n, a ? "replace" : "push");
    },
    exec_patch (e, t, i, r, s, { href: n , replace: a  }) {
        i.liveSocket.pushHistoryPatch(n, a ? "replace" : "push", r);
    },
    exec_focus (e, t, i, r, s) {
        window.requestAnimationFrame(()=>Y.attemptFocus(s));
    },
    exec_focus_first (e, t, i, r, s) {
        window.requestAnimationFrame(()=>Y.focusFirstInteractive(s) || Y.focusFirst(s));
    },
    exec_push_focus (e, t, i, r, s) {
        window.requestAnimationFrame(()=>we = s || r);
    },
    exec_pop_focus (e, t, i, r, s) {
        window.requestAnimationFrame(()=>{
            we && we.focus(), we = null;
        });
    },
    exec_add_class (e, t, i, r, s, { names: n , transition: a , time: o  }) {
        this.addOrRemoveClasses(s, n, [], a, o, i);
    },
    exec_remove_class (e, t, i, r, s, { names: n , transition: a , time: o  }) {
        this.addOrRemoveClasses(s, [], n, a, o, i);
    },
    exec_transition (e, t, i, r, s, { time: n , transition: a  }) {
        this.addOrRemoveClasses(s, [], [], a, n, i);
    },
    exec_toggle (e, t, i, r, s, { display: n , ins: a , outs: o , time: l  }) {
        this.toggle(e, i, s, n, a, o, l);
    },
    exec_show (e, t, i, r, s, { display: n , transition: a , time: o  }) {
        this.show(e, i, s, n, a, o);
    },
    exec_hide (e, t, i, r, s, { display: n , transition: a , time: o  }) {
        this.hide(e, i, s, n, a, o);
    },
    exec_set_attr (e, t, i, r, s, { attr: [n, a]  }) {
        this.setOrRemoveAttrs(s, [
            [
                n,
                a
            ]
        ], []);
    },
    exec_remove_attr (e, t, i, r, s, { attr: n  }) {
        this.setOrRemoveAttrs(s, [], [
            n
        ]);
    },
    show (e, t, i, r, s, n) {
        this.isVisible(i) || this.toggle(e, t, i, r, s, null, n);
    },
    hide (e, t, i, r, s, n) {
        this.isVisible(i) && this.toggle(e, t, i, r, null, s, n);
    },
    toggle (e, t, i, r, s, n, a) {
        let [o, l, c] = s || [
            [],
            [],
            []
        ], [u, v, m] = n || [
            [],
            [],
            []
        ];
        if (o.length > 0 || u.length > 0) if (this.isVisible(i)) {
            let f = ()=>{
                this.addOrRemoveClasses(i, v, o.concat(l).concat(c)), window.requestAnimationFrame(()=>{
                    this.addOrRemoveClasses(i, u, []), window.requestAnimationFrame(()=>this.addOrRemoveClasses(i, m, v));
                });
            };
            i.dispatchEvent(new Event("phx:hide-start")), t.transition(a, f, ()=>{
                this.addOrRemoveClasses(i, [], u.concat(m)), h.putSticky(i, "toggle", (w)=>w.style.display = "none"), i.dispatchEvent(new Event("phx:hide-end"));
            });
        } else {
            if (e === "remove") return;
            let f = ()=>{
                this.addOrRemoveClasses(i, l, u.concat(v).concat(m));
                let w = r || this.defaultDisplay(i);
                h.putSticky(i, "toggle", (A)=>A.style.display = w), window.requestAnimationFrame(()=>{
                    this.addOrRemoveClasses(i, o, []), window.requestAnimationFrame(()=>this.addOrRemoveClasses(i, c, l));
                });
            };
            i.dispatchEvent(new Event("phx:show-start")), t.transition(a, f, ()=>{
                this.addOrRemoveClasses(i, [], o.concat(c)), i.dispatchEvent(new Event("phx:show-end"));
            });
        }
        else this.isVisible(i) ? window.requestAnimationFrame(()=>{
            i.dispatchEvent(new Event("phx:hide-start")), h.putSticky(i, "toggle", (f)=>f.style.display = "none"), i.dispatchEvent(new Event("phx:hide-end"));
        }) : window.requestAnimationFrame(()=>{
            i.dispatchEvent(new Event("phx:show-start"));
            let f = r || this.defaultDisplay(i);
            h.putSticky(i, "toggle", (w)=>w.style.display = f), i.dispatchEvent(new Event("phx:show-end"));
        });
    },
    addOrRemoveClasses (e, t, i, r, s, n) {
        let [a, o, l] = r || [
            [],
            [],
            []
        ];
        if (a.length > 0) {
            let c = ()=>this.addOrRemoveClasses(e, o.concat(a), []), u = ()=>this.addOrRemoveClasses(e, t.concat(l), i.concat(a).concat(o));
            return n.transition(s, c, u);
        }
        window.requestAnimationFrame(()=>{
            let [c, u] = h.getSticky(e, "classes", [
                [],
                []
            ]), v = t.filter((A)=>c.indexOf(A) < 0 && !e.classList.contains(A)), m = i.filter((A)=>u.indexOf(A) < 0 && e.classList.contains(A)), f = c.filter((A)=>i.indexOf(A) < 0).concat(v), w = u.filter((A)=>t.indexOf(A) < 0).concat(m);
            h.putSticky(e, "classes", (A)=>(A.classList.remove(...w), A.classList.add(...f), [
                    f,
                    w
                ]));
        });
    },
    setOrRemoveAttrs (e, t, i) {
        let [r, s] = h.getSticky(e, "attrs", [
            [],
            []
        ]), n = t.map(([l, c])=>l).concat(i), a = r.filter(([l, c])=>!n.includes(l)).concat(t), o = s.filter((l)=>!n.includes(l)).concat(i);
        h.putSticky(e, "attrs", (l)=>(o.forEach((c)=>l.removeAttribute(c)), a.forEach(([c, u])=>l.setAttribute(c, u)), [
                a,
                o
            ]));
    },
    hasAllClasses (e, t) {
        return t.every((i)=>e.classList.contains(i));
    },
    isToggledOut (e, t) {
        return !this.isVisible(e) || this.hasAllClasses(e, t);
    },
    filterToEls (e, { to: t  }) {
        return t ? h.all(document, t) : [
            e
        ];
    },
    defaultDisplay (e) {
        return ({
            tr: "table-row",
            td: "table-cell"
        })[e.tagName.toLowerCase()] || "block";
    }
}, F = gi, Ae = (e, t, i = [])=>{
    let { submitter: r , ...s } = t, n = new FormData(e);
    r && r.hasAttribute("name") && r.form && r.form === e && n.append(r.name, r.value);
    let a = [];
    n.forEach((l, c, u)=>{
        l instanceof File && a.push(c);
    }), a.forEach((l)=>n.delete(l));
    let o = new URLSearchParams;
    for (let [l, c] of n.entries())(i.length === 0 || i.indexOf(l) >= 0) && o.append(l, c);
    for(let l in s)o.append(l, s[l]);
    return o.toString();
}, At = class {
    constructor(e, t, i, r, s){
        this.isDead = !1, this.liveSocket = t, this.flash = r, this.parent = i, this.root = i ? i.root : this, this.el = e, this.id = this.el.id, this.ref = 0, this.childJoins = 0, this.loaderTimer = null, this.pendingDiffs = [], this.pruningCIDs = [], this.redirect = !1, this.href = null, this.joinCount = this.parent ? this.parent.joinCount - 1 : 0, this.joinPending = !0, this.destroyed = !1, this.joinCallback = function(n) {
            n && n();
        }, this.stopCallback = function() {}, this.pendingJoinOps = this.parent ? null : [], this.viewHooks = {}, this.uploaders = {}, this.formSubmits = [], this.children = this.parent ? null : {}, this.root.children[this.id] = {}, this.channel = this.liveSocket.channel(`lv:${this.id}`, ()=>({
                redirect: this.redirect ? this.href : void 0,
                url: this.redirect ? void 0 : this.href || void 0,
                params: this.connectParams(s),
                session: this.getSession(),
                static: this.getStatic(),
                flash: this.flash
            }));
    }
    setHref(e) {
        this.href = e;
    }
    setRedirect(e) {
        this.redirect = !0, this.href = e;
    }
    isMain() {
        return this.el.hasAttribute(qe);
    }
    connectParams(e) {
        let t = this.liveSocket.params(this.el), i = h.all(document, `[${this.binding(Tt)}]`).map((r)=>r.src || r.href).filter((r)=>typeof r == "string");
        return i.length > 0 && (t._track_static = i), t._mounts = this.joinCount, t._live_referer = e, t;
    }
    isConnected() {
        return this.channel.canPush();
    }
    getSession() {
        return this.el.getAttribute(X);
    }
    getStatic() {
        let e = this.el.getAttribute(se);
        return e === "" ? null : e;
    }
    destroy(e = function() {}) {
        this.destroyAllChildren(), this.destroyed = !0, delete this.root.children[this.id], this.parent && delete this.root.children[this.parent.id][this.id], clearTimeout(this.loaderTimer);
        let t = ()=>{
            e();
            for(let i in this.viewHooks)this.destroyHook(this.viewHooks[i]);
        };
        h.markPhxChildDestroyed(this.el), this.log("destroyed", ()=>[
                "the child has been removed from the parent"
            ]), this.channel.leave().receive("ok", t).receive("error", t).receive("timeout", t);
    }
    setContainerClasses(...e) {
        this.el.classList.remove(Ze, De, et), this.el.classList.add(...e);
    }
    showLoader(e) {
        if (clearTimeout(this.loaderTimer), e) this.loaderTimer = setTimeout(()=>this.showLoader(), e);
        else {
            for(let t in this.viewHooks)this.viewHooks[t].__disconnected();
            this.setContainerClasses(De);
        }
    }
    execAll(e) {
        h.all(this.el, `[${e}]`, (t)=>this.liveSocket.execJS(t, t.getAttribute(e)));
    }
    hideLoader() {
        clearTimeout(this.loaderTimer), this.setContainerClasses(Ze), this.execAll(this.binding("connected"));
    }
    triggerReconnected() {
        for(let e in this.viewHooks)this.viewHooks[e].__reconnected();
    }
    log(e, t) {
        this.liveSocket.log(this, e, t);
    }
    transition(e, t, i = function() {}) {
        this.liveSocket.transition(e, t, i);
    }
    withinTargets(e, t) {
        if (e instanceof HTMLElement || e instanceof SVGElement) return this.liveSocket.owner(e, (i)=>t(i, e));
        if (V(e)) h.findComponentNodeList(this.el, e).length === 0 ? P2(`no component found matching phx-target of ${e}`) : t(this, parseInt(e));
        else {
            let i = Array.from(document.querySelectorAll(e));
            i.length === 0 && P2(`nothing found matching the phx-target selector "${e}"`), i.forEach((r)=>this.liveSocket.owner(r, (s)=>t(s, r)));
        }
    }
    applyDiff(e, t, i) {
        this.log(e, ()=>[
                "",
                ke(t)
            ]);
        let { diff: r , reply: s , events: n , title: a  } = gt.extract(t);
        i({
            diff: r,
            reply: s,
            events: n
        }), a && window.requestAnimationFrame(()=>h.putTitle(a));
    }
    onJoin(e) {
        let { rendered: t , container: i  } = e;
        if (i) {
            let [r, s] = i;
            this.el = h.replaceRootContainer(this.el, r, s);
        }
        this.childJoins = 0, this.joinPending = !0, this.flash = null, N.dropLocal(this.liveSocket.localStorage, window.location.pathname, mt), this.applyDiff("mount", t, ({ diff: r , events: s  })=>{
            this.rendered = new gt(this.id, r);
            let [n, a] = this.renderContainer(null, "join");
            this.dropPendingRefs();
            let o = this.formsForRecovery(n);
            this.joinCount++, o.length > 0 ? o.forEach(([l, c, u], v)=>{
                this.pushFormRecovery(l, u, (m)=>{
                    v === o.length - 1 && this.onJoinComplete(m, n, a, s);
                });
            }) : this.onJoinComplete(e, n, a, s);
        });
    }
    dropPendingRefs() {
        h.all(document, `[${q1}="${this.id}"][${M1}]`, (e)=>{
            e.removeAttribute(M1), e.removeAttribute(q1);
        });
    }
    onJoinComplete({ live_patch: e  }, t, i, r) {
        if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) return this.applyJoinPatch(e, t, i, r);
        h.findPhxChildrenInFragment(t, this.id).filter((n)=>{
            let a = n.id && this.el.querySelector(`[id="${n.id}"]`), o = a && a.getAttribute(se);
            return o && n.setAttribute(se, o), this.joinChild(n);
        }).length === 0 ? this.parent ? (this.root.pendingJoinOps.push([
            this,
            ()=>this.applyJoinPatch(e, t, i, r)
        ]), this.parent.ackJoin(this)) : (this.onAllChildJoinsComplete(), this.applyJoinPatch(e, t, i, r)) : this.root.pendingJoinOps.push([
            this,
            ()=>this.applyJoinPatch(e, t, i, r)
        ]);
    }
    attachTrueDocEl() {
        this.el = h.byId(this.id), this.el.setAttribute(ae, this.root.id);
    }
    execNewMounted() {
        h.all(this.el, `[${this.binding(Z)}], [data-phx-${Z}]`, (e)=>{
            this.maybeAddNewHook(e);
        }), h.all(this.el, `[${this.binding(rt)}]`, (e)=>this.maybeMounted(e));
    }
    applyJoinPatch(e, t, i, r) {
        this.attachTrueDocEl();
        let s = new ye(this, this.el, this.id, t, i, null);
        if (s.markPrunableContentForRemoval(), this.performPatch(s, !1), this.joinNewChildren(), this.execNewMounted(), this.joinPending = !1, this.liveSocket.dispatchEvents(r), this.applyPendingUpdates(), e) {
            let { kind: n , to: a  } = e;
            this.liveSocket.historyPatch(a, n);
        }
        this.hideLoader(), this.joinCount > 1 && this.triggerReconnected(), this.stopCallback();
    }
    triggerBeforeUpdateHook(e, t) {
        this.liveSocket.triggerDOM("onBeforeElUpdated", [
            e,
            t
        ]);
        let i = this.getHook(e), r = i && h.isIgnored(e, this.binding(Ce));
        if (i && !e.isEqualNode(t) && !(r && Kt(e.dataset, t.dataset))) return i.__beforeUpdate(), i;
    }
    maybeMounted(e) {
        let t = e.getAttribute(this.binding(rt)), i = t && h.private(e, "mounted");
        t && !i && (this.liveSocket.execJS(e, t), h.putPrivate(e, "mounted", !0));
    }
    maybeAddNewHook(e, t) {
        let i = this.addHook(e);
        i && i.__mounted();
    }
    performPatch(e, t) {
        let i = [], r = !1, s = new Set;
        return e.after("added", (n)=>{
            this.liveSocket.triggerDOM("onNodeAdded", [
                n
            ]), this.maybeAddNewHook(n), n.getAttribute && this.maybeMounted(n);
        }), e.after("phxChildAdded", (n)=>{
            h.isPhxSticky(n) ? this.liveSocket.joinRootViews() : r = !0;
        }), e.before("updated", (n, a)=>{
            this.triggerBeforeUpdateHook(n, a) && s.add(n.id);
        }), e.after("updated", (n)=>{
            s.has(n.id) && this.getHook(n).__updated();
        }), e.after("discarded", (n)=>{
            n.nodeType === Node.ELEMENT_NODE && i.push(n);
        }), e.after("transitionsDiscarded", (n)=>this.afterElementsRemoved(n, t)), e.perform(), this.afterElementsRemoved(i, t), r;
    }
    afterElementsRemoved(e, t) {
        let i = [];
        e.forEach((r)=>{
            let s = h.all(r, `[${D1}]`), n = h.all(r, `[${this.binding(Z)}]`);
            s.concat(r).forEach((a)=>{
                let o = this.componentID(a);
                V(o) && i.indexOf(o) === -1 && i.push(o);
            }), n.concat(r).forEach((a)=>{
                let o = this.getHook(a);
                o && this.destroyHook(o);
            });
        }), t && this.maybePushComponentsDestroyed(i);
    }
    joinNewChildren() {
        h.findPhxChildren(this.el, this.id).forEach((e)=>this.joinChild(e));
    }
    getChildById(e) {
        return this.root.children[this.id][e];
    }
    getDescendentByEl(e) {
        return e.id === this.id ? this : this.children[e.getAttribute(G)][e.id];
    }
    destroyDescendent(e) {
        for(let t in this.root.children)for(let i in this.root.children[t])if (i === e) return this.root.children[t][i].destroy();
    }
    joinChild(e) {
        if (!this.getChildById(e.id)) {
            let i = new At(e, this.liveSocket, this);
            return this.root.children[this.id][i.id] = i, i.join(), this.childJoins++, !0;
        }
    }
    isJoinPending() {
        return this.joinPending;
    }
    ackJoin(e) {
        this.childJoins--, this.childJoins === 0 && (this.parent ? this.parent.ackJoin(this) : this.onAllChildJoinsComplete());
    }
    onAllChildJoinsComplete() {
        this.joinCallback(()=>{
            this.pendingJoinOps.forEach(([e, t])=>{
                e.isDestroyed() || t();
            }), this.pendingJoinOps = [];
        });
    }
    update(e, t) {
        if (this.isJoinPending() || this.liveSocket.hasPendingLink() && this.root.isMain()) return this.pendingDiffs.push({
            diff: e,
            events: t
        });
        this.rendered.mergeDiff(e);
        let i = !1;
        this.rendered.isComponentOnlyDiff(e) ? this.liveSocket.time("component patch complete", ()=>{
            h.findParentCIDs(this.el, this.rendered.componentCIDs(e)).forEach((s)=>{
                this.componentPatch(this.rendered.getComponent(e, s), s) && (i = !0);
            });
        }) : lt(e) || this.liveSocket.time("full patch complete", ()=>{
            let [r, s] = this.renderContainer(e, "update"), n = new ye(this, this.el, this.id, r, s, null);
            i = this.performPatch(n, !0);
        }), this.liveSocket.dispatchEvents(t), i && this.joinNewChildren();
    }
    renderContainer(e, t) {
        return this.liveSocket.time(`toString diff (${t})`, ()=>{
            let i = this.el.tagName, r = e ? this.rendered.componentCIDs(e).concat(this.pruningCIDs) : null, [s, n] = this.rendered.toString(r);
            return [
                `<${i}>${s}</${i}>`,
                n
            ];
        });
    }
    componentPatch(e, t) {
        if (lt(e)) return !1;
        let [i, r] = this.rendered.componentToString(t), s = new ye(this, this.el, this.id, i, r, t);
        return this.performPatch(s, !0);
    }
    getHook(e) {
        return this.viewHooks[re.elementID(e)];
    }
    addHook(e) {
        if (re.elementID(e) || !e.getAttribute) return;
        let t = e.getAttribute(`data-phx-${Z}`) || e.getAttribute(this.binding(Z));
        if (t && !this.ownsElement(e)) return;
        let i = this.liveSocket.getHookCallbacks(t);
        if (i) {
            e.id || P2(`no DOM ID for hook "${t}". Hooks require a unique ID on each element.`, e);
            let r = new re(this, e, i);
            return this.viewHooks[re.elementID(r.el)] = r, r;
        } else t !== null && P2(`unknown hook found for "${t}"`, e);
    }
    destroyHook(e) {
        e.__destroyed(), e.__cleanup__(), delete this.viewHooks[re.elementID(e.el)];
    }
    applyPendingUpdates() {
        this.pendingDiffs.forEach(({ diff: e , events: t  })=>this.update(e, t)), this.pendingDiffs = [], this.eachChild((e)=>e.applyPendingUpdates());
    }
    eachChild(e) {
        let t = this.root.children[this.id] || {};
        for(let i in t)e(this.getChildById(i));
    }
    onChannel(e, t) {
        this.liveSocket.onChannel(this.channel, e, (i)=>{
            this.isJoinPending() ? this.root.pendingJoinOps.push([
                this,
                ()=>t(i)
            ]) : this.liveSocket.requestDOMUpdate(()=>t(i));
        });
    }
    bindChannel() {
        this.liveSocket.onChannel(this.channel, "diff", (e)=>{
            this.liveSocket.requestDOMUpdate(()=>{
                this.applyDiff("update", e, ({ diff: t , events: i  })=>this.update(t, i));
            });
        }), this.onChannel("redirect", ({ to: e , flash: t  })=>this.onRedirect({
                to: e,
                flash: t
            })), this.onChannel("live_patch", (e)=>this.onLivePatch(e)), this.onChannel("live_redirect", (e)=>this.onLiveRedirect(e)), this.channel.onError((e)=>this.onError(e)), this.channel.onClose((e)=>this.onClose(e));
    }
    destroyAllChildren() {
        this.eachChild((e)=>e.destroy());
    }
    onLiveRedirect(e) {
        let { to: t , kind: i , flash: r  } = e, s = this.expandURL(t);
        this.liveSocket.historyRedirect(s, i, r);
    }
    onLivePatch(e) {
        let { to: t , kind: i  } = e;
        this.href = this.expandURL(t), this.liveSocket.historyPatch(t, i);
    }
    expandURL(e) {
        return e.startsWith("/") ? `${window.location.protocol}//${window.location.host}${e}` : e;
    }
    onRedirect({ to: e , flash: t  }) {
        this.liveSocket.redirect(e, t);
    }
    isDestroyed() {
        return this.destroyed;
    }
    joinDead() {
        this.isDead = !0;
    }
    join(e) {
        this.showLoader(this.liveSocket.loaderTimeout), this.bindChannel(), this.isMain() && (this.stopCallback = this.liveSocket.withPageLoading({
            to: this.href,
            kind: "initial"
        })), this.joinCallback = (t)=>{
            t = t || function() {}, e ? e(this.joinCount, t) : t();
        }, this.liveSocket.wrapPush(this, {
            timeout: !1
        }, ()=>this.channel.join().receive("ok", (t)=>{
                this.isDestroyed() || this.liveSocket.requestDOMUpdate(()=>this.onJoin(t));
            }).receive("error", (t)=>!this.isDestroyed() && this.onJoinError(t)).receive("timeout", ()=>!this.isDestroyed() && this.onJoinError({
                    reason: "timeout"
                })));
    }
    onJoinError(e) {
        if (e.reason === "reload") return this.log("error", ()=>[
                `failed mount with ${e.status}. Falling back to page request`,
                e
            ]), this.onRedirect({
            to: this.href
        });
        if (e.reason === "unauthorized" || e.reason === "stale") return this.log("error", ()=>[
                "unauthorized live_redirect. Falling back to page request",
                e
            ]), this.onRedirect({
            to: this.href
        });
        if ((e.redirect || e.live_redirect) && (this.joinPending = !1, this.channel.leave()), e.redirect) return this.onRedirect(e.redirect);
        if (e.live_redirect) return this.onLiveRedirect(e.live_redirect);
        this.log("error", ()=>[
                "unable to join",
                e
            ]), this.liveSocket.isConnected() && this.liveSocket.reloadWithJitter(this);
    }
    onClose(e) {
        if (!this.isDestroyed()) {
            if (this.liveSocket.hasPendingLink() && e !== "leave") return this.liveSocket.reloadWithJitter(this);
            this.destroyAllChildren(), this.liveSocket.dropActiveElement(this), document.activeElement && document.activeElement.blur(), this.liveSocket.isUnloaded() && this.showLoader(Ut);
        }
    }
    onError(e) {
        this.onClose(e), this.liveSocket.isConnected() && this.log("error", ()=>[
                "view crashed",
                e
            ]), this.liveSocket.isUnloaded() || this.displayError();
    }
    displayError() {
        this.isMain() && h.dispatchEvent(window, "phx:page-loading-start", {
            detail: {
                to: this.href,
                kind: "error"
            }
        }), this.showLoader(), this.setContainerClasses(De, et), this.execAll(this.binding("disconnected"));
    }
    pushWithReply(e, t, i, r = function() {}) {
        if (!this.isConnected()) return;
        let [s, [n], a] = e ? e() : [
            null,
            [],
            {}
        ], o = function() {};
        return (a.page_loading || n && n.getAttribute(this.binding(Qe)) !== null) && (o = this.liveSocket.withPageLoading({
            kind: "element",
            target: n
        })), typeof i.cid != "number" && delete i.cid, this.liveSocket.wrapPush(this, {
            timeout: !0
        }, ()=>this.channel.push(t, i, Bt).receive("ok", (l)=>{
                let c = (u)=>{
                    l.redirect && this.onRedirect(l.redirect), l.live_patch && this.onLivePatch(l.live_patch), l.live_redirect && this.onLiveRedirect(l.live_redirect), s !== null && this.undoRefs(s), o(), r(l, u);
                };
                l.diff ? this.liveSocket.requestDOMUpdate(()=>{
                    this.applyDiff("update", l.diff, ({ diff: u , reply: v , events: m  })=>{
                        this.update(u, m), c(v);
                    });
                }) : c(null);
            }));
    }
    undoRefs(e) {
        this.isConnected() && h.all(document, `[${q1}="${this.id}"][${M1}="${e}"]`, (t)=>{
            let i = t.getAttribute(ce);
            t.removeAttribute(M1), t.removeAttribute(q1), t.getAttribute(Oe) !== null && (t.readOnly = !1, t.removeAttribute(Oe)), i !== null && (t.disabled = i === "true", t.removeAttribute(ce)), vt.forEach((n)=>h.removeClass(t, n));
            let r = t.getAttribute(fe);
            r !== null && (t.innerText = r, t.removeAttribute(fe));
            let s = h.private(t, M1);
            if (s) {
                let n = this.triggerBeforeUpdateHook(t, s);
                ye.patchEl(t, s, this.liveSocket.getActiveElement()), n && n.__updated(), h.deletePrivate(t, M1);
            }
        });
    }
    putRef(e, t, i = {}) {
        let r = this.ref++, s = this.binding(je);
        return i.loading && (e = e.concat(h.all(document, i.loading))), e.forEach((n)=>{
            n.classList.add(`phx-${t}-loading`), n.setAttribute(M1, r), n.setAttribute(q1, this.el.id);
            let a = n.getAttribute(s);
            a !== null && (n.getAttribute(fe) || n.setAttribute(fe, n.innerText), a !== "" && (n.innerText = a), n.setAttribute("disabled", ""));
        }), [
            r,
            e,
            i
        ];
    }
    componentID(e) {
        let t = e.getAttribute && e.getAttribute(D1);
        return t ? parseInt(t) : null;
    }
    targetComponentID(e, t, i = {}) {
        if (V(t)) return t;
        let r = e.getAttribute(this.binding("target"));
        return V(r) ? parseInt(r) : t && (r !== null || i.target) ? this.closestComponentID(t) : null;
    }
    closestComponentID(e) {
        return V(e) ? e : e ? j2(e.closest(`[${D1}]`), (t)=>this.ownsElement(t) && this.componentID(t)) : null;
    }
    pushHookEvent(e, t, i, r) {
        if (!this.isConnected()) return this.log("hook", ()=>[
                "unable to push hook event. LiveView not connected",
                t,
                i
            ]), !1;
        let [s, n, a] = this.putRef([], "hook");
        return this.pushWithReply(()=>[
                s,
                n,
                a
            ], "event", {
            type: "hook",
            event: t,
            value: i,
            cid: this.closestComponentID(e)
        }, (o, l)=>r(l, s)), s;
    }
    extractMeta(e, t, i) {
        let r = this.binding("value-");
        for(let s = 0; s < e.attributes.length; s++){
            t || (t = {});
            let n = e.attributes[s].name;
            n.startsWith(r) && (t[n.replace(r, "")] = e.getAttribute(n));
        }
        if (e.value !== void 0 && (t || (t = {}), t.value = e.value, e.tagName === "INPUT" && yt.indexOf(e.type) >= 0 && !e.checked && delete t.value), i) {
            t || (t = {});
            for(let s in i)t[s] = i[s];
        }
        return t;
    }
    pushEvent(e, t, i, r, s, n = {}) {
        this.pushWithReply(()=>this.putRef([
                t
            ], e, n), "event", {
            type: e,
            event: r,
            value: this.extractMeta(t, s, n.value),
            cid: this.targetComponentID(t, i, n)
        });
    }
    pushFileProgress(e, t, i, r = function() {}) {
        this.liveSocket.withinOwners(e.form, (s, n)=>{
            s.pushWithReply(null, "progress", {
                event: e.getAttribute(s.binding(Ft)),
                ref: e.getAttribute(W1),
                entry_ref: t,
                progress: i,
                cid: s.targetComponentID(e.form, n)
            }, r);
        });
    }
    pushInput(e, t, i, r, s, n) {
        let a, o = V(i) ? i : this.targetComponentID(e.form, t), l = ()=>this.putRef([
                e,
                e.form
            ], "change", s), c;
        e.getAttribute(this.binding("change")) ? c = Ae(e.form, {
            _target: s._target
        }, [
            e.name
        ]) : c = Ae(e.form, {
            _target: s._target
        }), h.isUploadInput(e) && e.files && e.files.length > 0 && C2.trackFiles(e, Array.from(e.files)), a = C2.serializeUploads(e);
        let u = {
            type: "form",
            event: r,
            value: c,
            uploads: a,
            cid: o
        };
        this.pushWithReply(l, "event", u, (v)=>{
            if (h.showError(e, this.liveSocket.binding(Ee)), h.isUploadInput(e) && e.getAttribute("data-phx-auto-upload") !== null) {
                if (C2.filesAwaitingPreflight(e).length > 0) {
                    let [m, f] = l();
                    this.uploadFiles(e.form, t, m, o, (w)=>{
                        n && n(v), this.triggerAwaitingSubmit(e.form);
                    });
                }
            } else n && n(v);
        });
    }
    triggerAwaitingSubmit(e) {
        let t = this.getScheduledSubmit(e);
        if (t) {
            let [i, r, s, n] = t;
            this.cancelSubmit(e), n();
        }
    }
    getScheduledSubmit(e) {
        return this.formSubmits.find(([t, i, r, s])=>t.isSameNode(e));
    }
    scheduleSubmit(e, t, i, r) {
        if (this.getScheduledSubmit(e)) return !0;
        this.formSubmits.push([
            e,
            t,
            i,
            r
        ]);
    }
    cancelSubmit(e) {
        this.formSubmits = this.formSubmits.filter(([t, i, r])=>t.isSameNode(e) ? (this.undoRefs(i), !1) : !0);
    }
    disableForm(e, t = {}) {
        let i = (u)=>!(ne(u, `${this.binding(Ce)}=ignore`, u.form) || ne(u, "data-phx-update=ignore", u.form)), r = (u)=>u.hasAttribute(this.binding(je)), s = (u)=>u.tagName == "BUTTON", n = (u)=>[
                "INPUT",
                "TEXTAREA",
                "SELECT"
            ].includes(u.tagName), a = Array.from(e.elements), o = a.filter(r), l = a.filter(s).filter(i), c = a.filter(n).filter(i);
        return l.forEach((u)=>{
            u.setAttribute(ce, u.disabled), u.disabled = !0;
        }), c.forEach((u)=>{
            u.setAttribute(Oe, u.readOnly), u.readOnly = !0, u.files && (u.setAttribute(ce, u.disabled), u.disabled = !0);
        }), e.setAttribute(this.binding(Qe), ""), this.putRef([
            e
        ].concat(o).concat(l).concat(c), "submit", t);
    }
    pushFormSubmit(e, t, i, r, s, n) {
        let a = ()=>this.disableForm(e, s), o = this.targetComponentID(e, t);
        if (C2.hasUploadsInProgress(e)) {
            let [l, c] = a(), u = ()=>this.pushFormSubmit(e, r, t, i, s, n);
            return this.scheduleSubmit(e, l, s, u);
        } else if (C2.inputsAwaitingPreflight(e).length > 0) {
            let [l, c] = a(), u = ()=>[
                    l,
                    c,
                    s
                ];
            this.uploadFiles(e, t, l, o, (v)=>{
                let m = Ae(e, {
                    submitter: r
                });
                this.pushWithReply(u, "event", {
                    type: "form",
                    event: i,
                    value: m,
                    cid: o
                }, n);
            });
        } else {
            let l = Ae(e, {
                submitter: r
            });
            this.pushWithReply(a, "event", {
                type: "form",
                event: i,
                value: l,
                cid: o
            }, n);
        }
    }
    uploadFiles(e, t, i, r, s) {
        let n = this.joinCount, a = C2.activeFileInputs(e), o = a.length;
        a.forEach((l)=>{
            let c = new C2(l, this, ()=>{
                o--, o === 0 && s();
            });
            this.uploaders[l] = c;
            let u = c.entries().map((m)=>m.toPreflightPayload()), v = {
                ref: l.getAttribute(W1),
                entries: u,
                cid: this.targetComponentID(l.form, t)
            };
            this.log("upload", ()=>[
                    "sending preflight request",
                    v
                ]), this.pushWithReply(null, "allow_upload", v, (m)=>{
                if (this.log("upload", ()=>[
                        "got preflight response",
                        m
                    ]), m.error) {
                    this.undoRefs(i);
                    let [f, w] = m.error;
                    this.log("upload", ()=>[
                            `error for entry ${f}`,
                            w
                        ]);
                } else {
                    let f = (w)=>{
                        this.channel.onError(()=>{
                            this.joinCount === n && w();
                        });
                    };
                    c.initAdapterUpload(m, f, this.liveSocket);
                }
            });
        });
    }
    dispatchUploads(e, t) {
        let i = h.findUploadInputs(this.el).filter((r)=>r.name === e);
        i.length === 0 ? P2(`no live file inputs found matching the name "${e}"`) : i.length > 1 ? P2(`duplicate live file inputs found matching the name "${e}"`) : h.dispatchEvent(i[0], bt, {
            detail: {
                files: t
            }
        });
    }
    pushFormRecovery(e, t, i) {
        this.liveSocket.withinOwners(e, (r, s)=>{
            let n = Array.from(e.elements).find((o)=>h.isFormInput(o) && o.type !== "hidden" && !o.hasAttribute(this.binding("change"))), a = e.getAttribute(this.binding(it)) || e.getAttribute(this.binding("change"));
            F.exec("change", a, r, n, [
                "push",
                {
                    _target: n.name,
                    newCid: t,
                    callback: i
                }
            ]);
        });
    }
    pushLinkPatch(e, t, i) {
        let r = this.liveSocket.setPendingLink(e), s = t ? ()=>this.putRef([
                t
            ], "click") : null, n = ()=>this.liveSocket.redirect(window.location.href), a = this.pushWithReply(s, "live_patch", {
            url: e
        }, (o)=>{
            this.liveSocket.requestDOMUpdate(()=>{
                o.link_redirect ? this.liveSocket.replaceMain(e, null, i, r) : (this.liveSocket.commitPendingLink(r) && (this.href = e), this.applyPendingUpdates(), i && i(r));
            });
        });
        a ? a.receive("timeout", n) : n();
    }
    formsForRecovery(e) {
        if (this.joinCount === 0) return [];
        let t = this.binding("change"), i = document.createElement("template");
        return i.innerHTML = e, h.all(this.el, `form[${t}]`).filter((r)=>r.id && this.ownsElement(r)).filter((r)=>r.elements.length > 0).filter((r)=>r.getAttribute(this.binding(it)) !== "ignore").map((r)=>{
            let s = i.content.querySelector(`form[id="${r.id}"][${t}="${r.getAttribute(t)}"]`);
            return s ? [
                r,
                s,
                this.targetComponentID(s)
            ] : [
                r,
                null,
                null
            ];
        }).filter(([r, s, n])=>s);
    }
    maybePushComponentsDestroyed(e) {
        let t = e.filter((i)=>h.findComponentNodeList(this.el, i).length === 0);
        t.length > 0 && (this.pruningCIDs.push(...t), this.pushWithReply(null, "cids_will_destroy", {
            cids: t
        }, ()=>{
            this.pruningCIDs = this.pruningCIDs.filter((r)=>t.indexOf(r) !== -1);
            let i = t.filter((r)=>h.findComponentNodeList(this.el, r).length === 0);
            i.length > 0 && this.pushWithReply(null, "cids_destroyed", {
                cids: i
            }, (r)=>{
                this.rendered.pruneCIDs(r.cids);
            });
        }));
    }
    ownsElement(e) {
        let t = e.closest(Q);
        return e.getAttribute(G) === this.id || t && t.id === this.id || !t && this.isDead;
    }
    submitForm(e, t, i, r, s = {}) {
        h.putPrivate(e, _e, !0);
        let n = this.liveSocket.binding(Ee), a = Array.from(e.elements);
        a.forEach((o)=>h.putPrivate(o, _e, !0)), this.liveSocket.blurActiveElement(this), this.pushFormSubmit(e, t, i, r, s, ()=>{
            a.forEach((o)=>h.showError(o, n)), this.liveSocket.restorePreviouslyActiveFocus();
        });
    }
    binding(e) {
        return this.liveSocket.binding(e);
    }
}, vi = class {
    constructor(e, t, i = {}){
        if (this.unloaded = !1, !t || t.constructor.name === "Object") throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
        this.socket = new t(e, i), this.bindingPrefix = i.bindingPrefix || $t, this.opts = i, this.params = Me(i.params || {}), this.viewLogger = i.viewLogger, this.metadataCallbacks = i.metadata || {}, this.defaults = Object.assign(ke(Jt), i.defaults || {}), this.activeElement = null, this.prevActive = null, this.silenced = !1, this.main = null, this.outgoingMainEl = null, this.clickStartedAtTarget = null, this.linkRef = 1, this.roots = {}, this.href = window.location.href, this.pendingLink = null, this.currentLocation = ke(window.location), this.hooks = i.hooks || {}, this.uploaders = i.uploaders || {}, this.loaderTimeout = i.loaderTimeout || Mt, this.reloadWithJitterTimer = null, this.maxReloads = i.maxReloads || _t, this.reloadJitterMin = i.reloadJitterMin || Ct, this.reloadJitterMax = i.reloadJitterMax || Pt, this.failsafeJitter = i.failsafeJitter || xt, this.localStorage = i.localStorage || window.localStorage, this.sessionStorage = i.sessionStorage || window.sessionStorage, this.boundTopLevelEvents = !1, this.domCallbacks = Object.assign({
            onNodeAdded: Me(),
            onBeforeElUpdated: Me()
        }, i.dom || {}), this.transitions = new mi, window.addEventListener("pagehide", (r)=>{
            this.unloaded = !0;
        }), this.socket.onOpen(()=>{
            this.isUnloaded() && window.location.reload();
        });
    }
    isProfileEnabled() {
        return this.sessionStorage.getItem(Ne) === "true";
    }
    isDebugEnabled() {
        return this.sessionStorage.getItem(pe) === "true";
    }
    isDebugDisabled() {
        return this.sessionStorage.getItem(pe) === "false";
    }
    enableDebug() {
        this.sessionStorage.setItem(pe, "true");
    }
    enableProfiling() {
        this.sessionStorage.setItem(Ne, "true");
    }
    disableDebug() {
        this.sessionStorage.setItem(pe, "false");
    }
    disableProfiling() {
        this.sessionStorage.removeItem(Ne);
    }
    enableLatencySim(e) {
        this.enableDebug(), console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable"), this.sessionStorage.setItem(Fe, e);
    }
    disableLatencySim() {
        this.sessionStorage.removeItem(Fe);
    }
    getLatencySim() {
        let e = this.sessionStorage.getItem(Fe);
        return e ? parseInt(e) : null;
    }
    getSocket() {
        return this.socket;
    }
    connect() {
        window.location.hostname === "localhost" && !this.isDebugDisabled() && this.enableDebug();
        let e = ()=>{
            this.joinRootViews() ? (this.bindTopLevelEvents(), this.socket.connect()) : this.main ? this.socket.connect() : this.bindTopLevelEvents({
                dead: !0
            }), this.joinDeadView();
        };
        [
            "complete",
            "loaded",
            "interactive"
        ].indexOf(document.readyState) >= 0 ? e() : document.addEventListener("DOMContentLoaded", ()=>e());
    }
    disconnect(e) {
        clearTimeout(this.reloadWithJitterTimer), this.socket.disconnect(e);
    }
    replaceTransport(e) {
        clearTimeout(this.reloadWithJitterTimer), this.socket.replaceTransport(e), this.connect();
    }
    execJS(e, t, i = null) {
        this.owner(e, (r)=>F.exec(i, t, r, e));
    }
    unload() {
        this.unloaded || (this.main && this.isConnected() && this.log(this.main, "socket", ()=>[
                "disconnect for page nav"
            ]), this.unloaded = !0, this.destroyAllViews(), this.disconnect());
    }
    triggerDOM(e, t) {
        this.domCallbacks[e](...t);
    }
    time(e, t) {
        if (!this.isProfileEnabled() || !console.time) return t();
        console.time(e);
        let i = t();
        return console.timeEnd(e), i;
    }
    log(e, t, i) {
        if (this.viewLogger) {
            let [r, s] = i();
            this.viewLogger(e, t, r, s);
        } else if (this.isDebugEnabled()) {
            let [r, s] = i();
            Wt(e, t, r, s);
        }
    }
    requestDOMUpdate(e) {
        this.transitions.after(e);
    }
    transition(e, t, i = function() {}) {
        this.transitions.addTransition(e, t, i);
    }
    onChannel(e, t, i) {
        e.on(t, (r)=>{
            let s = this.getLatencySim();
            s ? setTimeout(()=>i(r), s) : i(r);
        });
    }
    wrapPush(e, t, i) {
        let r = this.getLatencySim(), s = e.joinCount;
        if (!r) return this.isConnected() && t.timeout ? i().receive("timeout", ()=>{
            e.joinCount === s && !e.isDestroyed() && this.reloadWithJitter(e, ()=>{
                this.log(e, "timeout", ()=>[
                        "received timeout while communicating with server. Falling back to hard refresh for recovery"
                    ]);
            });
        }) : i();
        let n = {
            receives: [],
            receive (a, o) {
                this.receives.push([
                    a,
                    o
                ]);
            }
        };
        return setTimeout(()=>{
            e.isDestroyed() || n.receives.reduce((a, [o, l])=>a.receive(o, l), i());
        }, r), n;
    }
    reloadWithJitter(e, t) {
        clearTimeout(this.reloadWithJitterTimer), this.disconnect();
        let i = this.reloadJitterMin, r = this.reloadJitterMax, s = Math.floor(Math.random() * (r - i + 1)) + i, n = N.updateLocal(this.localStorage, window.location.pathname, mt, 0, (a)=>a + 1);
        n > this.maxReloads && (s = this.failsafeJitter), this.reloadWithJitterTimer = setTimeout(()=>{
            e.isDestroyed() || e.isConnected() || (e.destroy(), t ? t() : this.log(e, "join", ()=>[
                    `encountered ${n} consecutive reloads`
                ]), n > this.maxReloads && this.log(e, "join", ()=>[
                    `exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`
                ]), this.hasPendingLink() ? window.location = this.pendingLink : window.location.reload());
        }, s);
    }
    getHookCallbacks(e) {
        return e && e.startsWith("Phoenix.") ? Zt[e.split(".")[1]] : this.hooks[e];
    }
    isUnloaded() {
        return this.unloaded;
    }
    isConnected() {
        return this.socket.isConnected();
    }
    getBindingPrefix() {
        return this.bindingPrefix;
    }
    binding(e) {
        return `${this.getBindingPrefix()}${e}`;
    }
    channel(e, t) {
        return this.socket.channel(e, t);
    }
    joinDeadView() {
        let e = document.body;
        if (e && !this.isPhxView(e) && !this.isPhxView(document.firstElementChild)) {
            let t = this.newRootView(e);
            t.setHref(this.getHref()), t.joinDead(), this.main || (this.main = t), window.requestAnimationFrame(()=>t.execNewMounted());
        }
    }
    joinRootViews() {
        let e = !1;
        return h.all(document, `${Q}:not([${G}])`, (t)=>{
            if (!this.getRootById(t.id)) {
                let i = this.newRootView(t);
                i.setHref(this.getHref()), i.join(), t.hasAttribute(qe) && (this.main = i);
            }
            e = !0;
        }), e;
    }
    redirect(e, t) {
        this.unload(), N.redirect(e, t);
    }
    replaceMain(e, t, i = null, r = this.setPendingLink(e)) {
        let s = this.currentLocation.href;
        this.outgoingMainEl = this.outgoingMainEl || this.main.el;
        let n = h.cloneNode(this.outgoingMainEl, "");
        this.main.showLoader(this.loaderTimeout), this.main.destroy(), this.main = this.newRootView(n, t, s), this.main.setRedirect(e), this.transitionRemoves(), this.main.join((a, o)=>{
            a === 1 && this.commitPendingLink(r) && this.requestDOMUpdate(()=>{
                h.findPhxSticky(document).forEach((l)=>n.appendChild(l)), this.outgoingMainEl.replaceWith(n), this.outgoingMainEl = null, i && requestAnimationFrame(i), o();
            });
        });
    }
    transitionRemoves(e) {
        let t = this.binding("remove");
        e = e || h.all(document, `[${t}]`), e.forEach((i)=>{
            document.body.contains(i) && this.execJS(i, i.getAttribute(t), "remove");
        });
    }
    isPhxView(e) {
        return e.getAttribute && e.getAttribute(X) !== null;
    }
    newRootView(e, t, i) {
        let r = new At(e, this, null, t, i);
        return this.roots[r.id] = r, r;
    }
    owner(e, t) {
        let i = j2(e.closest(Q), (r)=>this.getViewByEl(r)) || this.main;
        i && t(i);
    }
    withinOwners(e, t) {
        this.owner(e, (i)=>t(i, e));
    }
    getViewByEl(e) {
        let t = e.getAttribute(ae);
        return j2(this.getRootById(t), (i)=>i.getDescendentByEl(e));
    }
    getRootById(e) {
        return this.roots[e];
    }
    destroyAllViews() {
        for(let e in this.roots)this.roots[e].destroy(), delete this.roots[e];
        this.main = null;
    }
    destroyViewByEl(e) {
        let t = this.getRootById(e.getAttribute(ae));
        t && t.id === e.id ? (t.destroy(), delete this.roots[t.id]) : t && t.destroyDescendent(e.id);
    }
    setActiveElement(e) {
        if (this.activeElement === e) return;
        this.activeElement = e;
        let t = ()=>{
            e === this.activeElement && (this.activeElement = null), e.removeEventListener("mouseup", this), e.removeEventListener("touchend", this);
        };
        e.addEventListener("mouseup", t), e.addEventListener("touchend", t);
    }
    getActiveElement() {
        return document.activeElement === document.body ? this.activeElement || document.activeElement : document.activeElement || document.body;
    }
    dropActiveElement(e) {
        this.prevActive && e.ownsElement(this.prevActive) && (this.prevActive = null);
    }
    restorePreviouslyActiveFocus() {
        this.prevActive && this.prevActive !== document.body && this.prevActive.focus();
    }
    blurActiveElement() {
        this.prevActive = this.getActiveElement(), this.prevActive !== document.body && this.prevActive.blur();
    }
    bindTopLevelEvents({ dead: e  } = {}) {
        this.boundTopLevelEvents || (this.boundTopLevelEvents = !0, this.socket.onClose((t)=>{
            if (t && t.code === 1001) return this.unload();
            if (t && t.code === 1e3 && this.main) return this.reloadWithJitter(this.main);
        }), document.body.addEventListener("click", function() {}), window.addEventListener("pageshow", (t)=>{
            t.persisted && (this.getSocket().disconnect(), this.withPageLoading({
                to: window.location.href,
                kind: "redirect"
            }), window.location.reload());
        }, !0), e || this.bindNav(), this.bindClicks(), e || this.bindForms(), this.bind({
            keyup: "keyup",
            keydown: "keydown"
        }, (t, i, r, s, n, a)=>{
            let o = s.getAttribute(this.binding(Nt)), l = t.key && t.key.toLowerCase();
            if (o && o.toLowerCase() !== l) return;
            let c = {
                key: t.key,
                ...this.eventMeta(i, t, s)
            };
            F.exec(i, n, r, s, [
                "push",
                {
                    data: c
                }
            ]);
        }), this.bind({
            blur: "focusout",
            focus: "focusin"
        }, (t, i, r, s, n, a)=>{
            if (!a) {
                let o = {
                    key: t.key,
                    ...this.eventMeta(i, t, s)
                };
                F.exec(i, n, r, s, [
                    "push",
                    {
                        data: o
                    }
                ]);
            }
        }), this.bind({
            blur: "blur",
            focus: "focus"
        }, (t, i, r, s, n, a, o)=>{
            if (o === "window") {
                let l = this.eventMeta(i, t, s);
                F.exec(i, a, r, s, [
                    "push",
                    {
                        data: l
                    }
                ]);
            }
        }), window.addEventListener("dragover", (t)=>t.preventDefault()), window.addEventListener("drop", (t)=>{
            t.preventDefault();
            let i = j2(ne(t.target, this.binding(Ge)), (n)=>n.getAttribute(this.binding(Ge))), r = i && document.getElementById(i), s = Array.from(t.dataTransfer.files || []);
            !r || r.disabled || s.length === 0 || !(r.files instanceof FileList) || (C2.trackFiles(r, s, t.dataTransfer), r.dispatchEvent(new Event("input", {
                bubbles: !0
            })));
        }), this.on(bt, (t)=>{
            let i = t.target;
            if (!h.isUploadInput(i)) return;
            let r = Array.from(t.detail.files || []).filter((s)=>s instanceof File || s instanceof Blob);
            C2.trackFiles(i, r), i.dispatchEvent(new Event("input", {
                bubbles: !0
            }));
        }));
    }
    eventMeta(e, t, i) {
        let r = this.metadataCallbacks[e];
        return r ? r(t, i) : {};
    }
    setPendingLink(e) {
        return this.linkRef++, this.pendingLink = e, this.linkRef;
    }
    commitPendingLink(e) {
        return this.linkRef !== e ? !1 : (this.href = this.pendingLink, this.pendingLink = null, !0);
    }
    getHref() {
        return this.href;
    }
    hasPendingLink() {
        return !!this.pendingLink;
    }
    bind(e, t) {
        for(let i in e){
            let r = e[i];
            this.on(r, (s)=>{
                let n = this.binding(i), a = this.binding(`window-${i}`), o = s.target.getAttribute && s.target.getAttribute(n);
                o ? this.debounce(s.target, s, r, ()=>{
                    this.withinOwners(s.target, (l)=>{
                        t(s, i, l, s.target, o, null);
                    });
                }) : h.all(document, `[${a}]`, (l)=>{
                    let c = l.getAttribute(a);
                    this.debounce(l, s, r, ()=>{
                        this.withinOwners(l, (u)=>{
                            t(s, i, u, l, c, "window");
                        });
                    });
                });
            });
        }
    }
    bindClicks() {
        window.addEventListener("click", (e)=>this.clickStartedAtTarget = e.target), this.bindClick("click", "click", !1), this.bindClick("mousedown", "capture-click", !0);
    }
    bindClick(e, t, i) {
        let r = this.binding(t);
        window.addEventListener(e, (s)=>{
            let n = null;
            if (i) n = s.target.matches(`[${r}]`) ? s.target : s.target.querySelector(`[${r}]`);
            else {
                let o = this.clickStartedAtTarget || s.target;
                n = ne(o, r), this.dispatchClickAway(s, o), this.clickStartedAtTarget = null;
            }
            let a = n && n.getAttribute(r);
            if (!a) {
                let o = s.target instanceof HTMLAnchorElement ? s.target.getAttribute("href") : null;
                !i && o !== null && !h.wantsNewTab(s) && h.isNewPageHref(o, window.location) && this.unload();
                return;
            }
            n.getAttribute("href") === "#" && s.preventDefault(), this.debounce(n, s, "click", ()=>{
                this.withinOwners(n, (o)=>{
                    F.exec("click", a, o, n, [
                        "push",
                        {
                            data: this.eventMeta("click", s, n)
                        }
                    ]);
                });
            });
        }, i);
    }
    dispatchClickAway(e, t) {
        let i = this.binding("click-away");
        h.all(document, `[${i}]`, (r)=>{
            r.isSameNode(t) || r.contains(t) || this.withinOwners(e.target, (s)=>{
                let n = r.getAttribute(i);
                F.isVisible(r) && F.exec("click", n, s, r, [
                    "push",
                    {
                        data: this.eventMeta("click", e, e.target)
                    }
                ]);
            });
        });
    }
    bindNav() {
        if (!N.canPushState()) return;
        history.scrollRestoration && (history.scrollRestoration = "manual");
        let e = null;
        window.addEventListener("scroll", (t)=>{
            clearTimeout(e), e = setTimeout(()=>{
                N.updateCurrentState((i)=>Object.assign(i, {
                        scroll: window.scrollY
                    }));
            }, 100);
        }), window.addEventListener("popstate", (t)=>{
            if (!this.registerNewLocation(window.location)) return;
            let { type: i , id: r , root: s , scroll: n  } = t.state || {}, a = window.location.href;
            this.requestDOMUpdate(()=>{
                this.main.isConnected() && i === "patch" && r === this.main.id ? this.main.pushLinkPatch(a, null, ()=>{
                    this.maybeScroll(n);
                }) : this.replaceMain(a, null, ()=>{
                    s && this.replaceRootHistory(), this.maybeScroll(n);
                });
            });
        }, !1), window.addEventListener("click", (t)=>{
            let i = ne(t.target, Le), r = i && i.getAttribute(Le);
            if (!r || !this.isConnected() || !this.main || h.wantsNewTab(t)) return;
            let s = i.href, n = i.getAttribute(It);
            t.preventDefault(), t.stopImmediatePropagation(), this.pendingLink !== s && this.requestDOMUpdate(()=>{
                if (r === "patch") this.pushHistoryPatch(s, n, i);
                else if (r === "redirect") this.historyRedirect(s, n);
                else throw new Error(`expected ${Le} to be "patch" or "redirect", got: ${r}`);
                let a = i.getAttribute(this.binding("click"));
                a && this.requestDOMUpdate(()=>this.execJS(i, a, "click"));
            });
        }, !1);
    }
    maybeScroll(e) {
        typeof e == "number" && requestAnimationFrame(()=>{
            window.scrollTo(0, e);
        });
    }
    dispatchEvent(e, t = {}) {
        h.dispatchEvent(window, `phx:${e}`, {
            detail: t
        });
    }
    dispatchEvents(e) {
        e.forEach(([t, i])=>this.dispatchEvent(t, i));
    }
    withPageLoading(e, t) {
        h.dispatchEvent(window, "phx:page-loading-start", {
            detail: e
        });
        let i = ()=>h.dispatchEvent(window, "phx:page-loading-stop", {
                detail: e
            });
        return t ? t(i) : i;
    }
    pushHistoryPatch(e, t, i) {
        if (!this.isConnected()) return N.redirect(e);
        this.withPageLoading({
            to: e,
            kind: "patch"
        }, (r)=>{
            this.main.pushLinkPatch(e, i, (s)=>{
                this.historyPatch(e, t, s), r();
            });
        });
    }
    historyPatch(e, t, i = this.setPendingLink(e)) {
        this.commitPendingLink(i) && (N.pushState(t, {
            type: "patch",
            id: this.main.id
        }, e), this.registerNewLocation(window.location));
    }
    historyRedirect(e, t, i) {
        if (!this.isConnected()) return N.redirect(e, i);
        if (/^\/$|^\/[^\/]+.*$/.test(e)) {
            let { protocol: s , host: n  } = window.location;
            e = `${s}//${n}${e}`;
        }
        let r = window.scrollY;
        this.withPageLoading({
            to: e,
            kind: "redirect"
        }, (s)=>{
            this.replaceMain(e, i, ()=>{
                N.pushState(t, {
                    type: "redirect",
                    id: this.main.id,
                    scroll: r
                }, e), this.registerNewLocation(window.location), s();
            });
        });
    }
    replaceRootHistory() {
        N.pushState("replace", {
            root: !0,
            type: "patch",
            id: this.main.id
        });
    }
    registerNewLocation(e) {
        let { pathname: t , search: i  } = this.currentLocation;
        return t + i === e.pathname + e.search ? !1 : (this.currentLocation = ke(e), !0);
    }
    bindForms() {
        let e = 0, t = !1;
        this.on("submit", (i)=>{
            let r = i.target.getAttribute(this.binding("submit")), s = i.target.getAttribute(this.binding("change"));
            !t && s && !r && (t = !0, i.preventDefault(), this.withinOwners(i.target, (n)=>{
                n.disableForm(i.target), window.requestAnimationFrame(()=>{
                    h.isUnloadableFormSubmit(i) && this.unload(), i.target.submit();
                });
            }));
        }, !0), this.on("submit", (i)=>{
            let r = i.target.getAttribute(this.binding("submit"));
            if (!r) {
                h.isUnloadableFormSubmit(i) && this.unload();
                return;
            }
            i.preventDefault(), i.target.disabled = !0, this.withinOwners(i.target, (s)=>{
                F.exec("submit", r, s, i.target, [
                    "push",
                    {
                        submitter: i.submitter
                    }
                ]);
            });
        }, !1);
        for (let i of [
            "change",
            "input"
        ])this.on(i, (r)=>{
            let s = this.binding("change"), n = r.target, a = n.getAttribute(s), o = n.form && n.form.getAttribute(s), l = a || o;
            if (!l || n.type === "number" && n.validity && n.validity.badInput) return;
            let c = a ? n : n.form, u = e;
            e++;
            let { at: v , type: m  } = h.private(n, "prev-iteration") || {};
            v === u - 1 && i !== m || (h.putPrivate(n, "prev-iteration", {
                at: u,
                type: i
            }), this.debounce(n, r, i, ()=>{
                this.withinOwners(c, (f)=>{
                    h.putPrivate(n, Ve, !0), h.isTextualInput(n) || this.setActiveElement(n), F.exec("change", l, f, n, [
                        "push",
                        {
                            _target: r.target.name,
                            dispatcher: c
                        }
                    ]);
                });
            }));
        }, !1);
        this.on("reset", (i)=>{
            let r = i.target;
            h.resetForm(r, this.binding(Ee));
            let s = Array.from(r.elements).find((n)=>n.type === "reset");
            window.requestAnimationFrame(()=>{
                s.dispatchEvent(new Event("input", {
                    bubbles: !0,
                    cancelable: !1
                }));
            });
        });
    }
    debounce(e, t, i, r) {
        if (i === "blur" || i === "focusout") return r();
        let s = this.binding(Ot), n = this.binding(Ht), a = this.defaults.debounce.toString(), o = this.defaults.throttle.toString();
        this.withinOwners(e, (l)=>{
            let c = ()=>!l.isDestroyed() && document.body.contains(e);
            h.debounce(e, t, s, a, n, o, c, ()=>{
                r();
            });
        });
    }
    silenceEvents(e) {
        this.silenced = !0, e(), this.silenced = !1;
    }
    on(e, t) {
        window.addEventListener(e, (i)=>{
            this.silenced || t(i);
        });
    }
}, mi = class {
    constructor(){
        this.transitions = new Set, this.pendingOps = [];
    }
    reset() {
        this.transitions.forEach((e)=>{
            clearTimeout(e), this.transitions.delete(e);
        }), this.flushPendingOps();
    }
    after(e) {
        this.size() === 0 ? e() : this.pushPendingOp(e);
    }
    addTransition(e, t, i) {
        t();
        let r = setTimeout(()=>{
            this.transitions.delete(r), i(), this.flushPendingOps();
        }, e);
        this.transitions.add(r);
    }
    pushPendingOp(e) {
        this.pendingOps.push(e);
    }
    size() {
        return this.transitions.size;
    }
    flushPendingOps() {
        if (this.size() > 0) return;
        let e = this.pendingOps.shift();
        e && (e(), this.flushPendingOps());
    }
};
const url = "/live";
let csrfToken = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");
let liveSocket = new vi(url, x1, {
    params: {
        _csrf_token: csrfToken
    },
    hooks: {}
});
window.addEventListener("phx:refresh", (e)=>{
    console.log("phx:refresh", e);
});
window.addEventListener("phx:page-loading-start", (info)=>A.start());
window.addEventListener("phx:page-loading-stop", (info)=>A.done());
liveSocket.connect();
window.liveSocket = liveSocket;

