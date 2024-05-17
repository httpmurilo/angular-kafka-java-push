import {
  Actions,
  Store,
  getValue,
  ofActionDispatched
} from "./chunk-2NLOVXJW.js";
import "./chunk-C76TGWHB.js";
import {
  APP_INITIALIZER,
  AnonymousSubject,
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  Observable,
  ReplaySubject,
  Subject,
  Subscriber,
  Subscription,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-Y4DY6BWM.js";
import {
  __assign,
  __extends
} from "./chunk-QOHD3WUR.js";

// node_modules/rxjs/dist/esm5/internal/observable/dom/WebSocketSubject.js
var DEFAULT_WEBSOCKET_CONFIG = {
  url: "",
  deserializer: function(e) {
    return JSON.parse(e.data);
  },
  serializer: function(value) {
    return JSON.stringify(value);
  }
};
var WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT = "WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }";
var WebSocketSubject = function(_super) {
  __extends(WebSocketSubject2, _super);
  function WebSocketSubject2(urlConfigOrSource, destination) {
    var _this = _super.call(this) || this;
    _this._socket = null;
    if (urlConfigOrSource instanceof Observable) {
      _this.destination = destination;
      _this.source = urlConfigOrSource;
    } else {
      var config = _this._config = __assign({}, DEFAULT_WEBSOCKET_CONFIG);
      _this._output = new Subject();
      if (typeof urlConfigOrSource === "string") {
        config.url = urlConfigOrSource;
      } else {
        for (var key in urlConfigOrSource) {
          if (urlConfigOrSource.hasOwnProperty(key)) {
            config[key] = urlConfigOrSource[key];
          }
        }
      }
      if (!config.WebSocketCtor && WebSocket) {
        config.WebSocketCtor = WebSocket;
      } else if (!config.WebSocketCtor) {
        throw new Error("no WebSocket constructor can be found");
      }
      _this.destination = new ReplaySubject();
    }
    return _this;
  }
  WebSocketSubject2.prototype.lift = function(operator) {
    var sock = new WebSocketSubject2(this._config, this.destination);
    sock.operator = operator;
    sock.source = this;
    return sock;
  };
  WebSocketSubject2.prototype._resetState = function() {
    this._socket = null;
    if (!this.source) {
      this.destination = new ReplaySubject();
    }
    this._output = new Subject();
  };
  WebSocketSubject2.prototype.multiplex = function(subMsg, unsubMsg, messageFilter) {
    var self = this;
    return new Observable(function(observer) {
      try {
        self.next(subMsg());
      } catch (err) {
        observer.error(err);
      }
      var subscription = self.subscribe({
        next: function(x) {
          try {
            if (messageFilter(x)) {
              observer.next(x);
            }
          } catch (err) {
            observer.error(err);
          }
        },
        error: function(err) {
          return observer.error(err);
        },
        complete: function() {
          return observer.complete();
        }
      });
      return function() {
        try {
          self.next(unsubMsg());
        } catch (err) {
          observer.error(err);
        }
        subscription.unsubscribe();
      };
    });
  };
  WebSocketSubject2.prototype._connectSocket = function() {
    var _this = this;
    var _a = this._config, WebSocketCtor = _a.WebSocketCtor, protocol = _a.protocol, url = _a.url, binaryType = _a.binaryType;
    var observer = this._output;
    var socket = null;
    try {
      socket = protocol ? new WebSocketCtor(url, protocol) : new WebSocketCtor(url);
      this._socket = socket;
      if (binaryType) {
        this._socket.binaryType = binaryType;
      }
    } catch (e) {
      observer.error(e);
      return;
    }
    var subscription = new Subscription(function() {
      _this._socket = null;
      if (socket && socket.readyState === 1) {
        socket.close();
      }
    });
    socket.onopen = function(evt) {
      var _socket = _this._socket;
      if (!_socket) {
        socket.close();
        _this._resetState();
        return;
      }
      var openObserver = _this._config.openObserver;
      if (openObserver) {
        openObserver.next(evt);
      }
      var queue = _this.destination;
      _this.destination = Subscriber.create(function(x) {
        if (socket.readyState === 1) {
          try {
            var serializer = _this._config.serializer;
            socket.send(serializer(x));
          } catch (e) {
            _this.destination.error(e);
          }
        }
      }, function(err) {
        var closingObserver = _this._config.closingObserver;
        if (closingObserver) {
          closingObserver.next(void 0);
        }
        if (err && err.code) {
          socket.close(err.code, err.reason);
        } else {
          observer.error(new TypeError(WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT));
        }
        _this._resetState();
      }, function() {
        var closingObserver = _this._config.closingObserver;
        if (closingObserver) {
          closingObserver.next(void 0);
        }
        socket.close();
        _this._resetState();
      });
      if (queue && queue instanceof ReplaySubject) {
        subscription.add(queue.subscribe(_this.destination));
      }
    };
    socket.onerror = function(e) {
      _this._resetState();
      observer.error(e);
    };
    socket.onclose = function(e) {
      if (socket === _this._socket) {
        _this._resetState();
      }
      var closeObserver = _this._config.closeObserver;
      if (closeObserver) {
        closeObserver.next(e);
      }
      if (e.wasClean) {
        observer.complete();
      } else {
        observer.error(e);
      }
    };
    socket.onmessage = function(e) {
      try {
        var deserializer = _this._config.deserializer;
        observer.next(deserializer(e));
      } catch (err) {
        observer.error(err);
      }
    };
  };
  WebSocketSubject2.prototype._subscribe = function(subscriber) {
    var _this = this;
    var source = this.source;
    if (source) {
      return source.subscribe(subscriber);
    }
    if (!this._socket) {
      this._connectSocket();
    }
    this._output.subscribe(subscriber);
    subscriber.add(function() {
      var _socket = _this._socket;
      if (_this._output.observers.length === 0) {
        if (_socket && (_socket.readyState === 1 || _socket.readyState === 0)) {
          _socket.close();
        }
        _this._resetState();
      }
    });
    return subscriber;
  };
  WebSocketSubject2.prototype.unsubscribe = function() {
    var _socket = this._socket;
    if (_socket && (_socket.readyState === 1 || _socket.readyState === 0)) {
      _socket.close();
    }
    this._resetState();
    _super.prototype.unsubscribe.call(this);
  };
  return WebSocketSubject2;
}(AnonymousSubject);

// node_modules/@ngxs/websocket-plugin/fesm2015/ngxs-websocket-plugin.js
var NGXS_WEBSOCKET_OPTIONS = new InjectionToken("NGXS_WEBSOCKET_OPTIONS");
function noop(..._args) {
  return function() {
  };
}
var ConnectWebSocket = class {
  constructor(payload) {
    this.payload = payload;
  }
};
ConnectWebSocket.type = "[WebSocket] Connect";
var WebsocketMessageError = class {
  constructor(payload) {
    this.payload = payload;
  }
};
WebsocketMessageError.type = "[WebSocket] Message Error";
var DisconnectWebSocket = class {
};
DisconnectWebSocket.type = "[WebSocket] Disconnect";
var WebSocketConnected = class {
};
WebSocketConnected.type = "[WebSocket] Connected";
var WebSocketDisconnected = class {
};
WebSocketDisconnected.type = "[WebSocket] Disconnected";
var SendWebSocketMessage = class {
  constructor(payload) {
    this.payload = payload;
  }
};
SendWebSocketMessage.type = "[WebSocket] Send Message";
var WebSocketConnectionUpdated = class {
};
WebSocketConnectionUpdated.type = "[WebSocket] Connection Updated";
var TypeKeyPropertyMissingError = class extends Error {
  constructor(typeKey) {
    super(`Property ${typeKey} is missing on the socket message`);
  }
};
var WebSocketHandler = class {
  constructor(store, actions$, options) {
    this.store = store;
    this.actions$ = actions$;
    this.options = options;
    this.socket = null;
    this.config = {
      url: this.options.url,
      protocol: this.options.protocol,
      // Default binary type is `blob` for the global `WebSocket`
      binaryType: this.options.binaryType,
      serializer: this.options.serializer,
      deserializer: this.options.deserializer,
      closeObserver: {
        next: () => {
          this.disconnect();
        }
      },
      openObserver: {
        next: () => this.store.dispatch(new WebSocketConnected())
      }
    };
    this.typeKey = this.options.typeKey;
    this.subscription = new Subscription();
    this.setupActionsListeners();
  }
  ngOnDestroy() {
    this.closeConnection();
    this.subscription.unsubscribe();
  }
  setupActionsListeners() {
    this.subscription.add(this.actions$.pipe(ofActionDispatched(ConnectWebSocket)).subscribe(({
      payload
    }) => {
      this.connect(payload);
    }));
    this.subscription.add(this.actions$.pipe(ofActionDispatched(DisconnectWebSocket)).subscribe(() => {
      this.disconnect();
    }));
    this.subscription.add(this.actions$.pipe(ofActionDispatched(SendWebSocketMessage)).subscribe(({
      payload
    }) => {
      this.send(payload);
    }));
  }
  connect(options) {
    this.updateConnection();
    if (options) {
      this.mergeConfigWithOptions(options);
    }
    this.socket = new WebSocketSubject(this.config);
    this.socket.subscribe({
      next: (message) => {
        const type = getValue(message, this.typeKey);
        if (!type) {
          throw new TypeKeyPropertyMissingError(this.typeKey);
        }
        this.store.dispatch(Object.assign(Object.assign({}, message), {
          type
        }));
      },
      error: (error) => {
        if (error instanceof CloseEvent) {
          this.dispatchWebSocketDisconnected();
        } else {
          this.store.dispatch(new WebsocketMessageError(error));
        }
      }
    });
  }
  disconnect() {
    if (this.socket) {
      this.closeConnection();
      this.dispatchWebSocketDisconnected();
    }
  }
  send(data) {
    if (!this.socket) {
      throw new Error("You must connect to the socket before sending any data");
    }
    this.socket.next(data);
  }
  /**
   * Don't enlarge the `connect` method
   */
  mergeConfigWithOptions(options) {
    if (options.url) {
      this.config.url = options.url;
    }
    if (options.serializer) {
      this.config.serializer = options.serializer;
    }
    if (options.deserializer) {
      this.config.deserializer = options.deserializer;
    }
  }
  /**
   * To ensure we don't have any memory leaks
   * e.g. if the user occasionally dispatched `ConnectWebSocket` twice
   * then the previous subscription will still live in the memory
   * to prevent such behavior - we close the previous connection if it exists
   */
  updateConnection() {
    if (this.socket) {
      this.closeConnection();
      this.store.dispatch(new WebSocketConnectionUpdated());
    }
  }
  /**
   * Used in many places so it's better to move the code into function
   */
  dispatchWebSocketDisconnected() {
    this.store.dispatch(new WebSocketDisconnected());
  }
  closeConnection() {
    if (this.socket !== null) {
      this.socket.complete();
      this.socket = null;
    }
  }
};
WebSocketHandler.ɵfac = function WebSocketHandler_Factory(t) {
  return new (t || WebSocketHandler)(ɵɵinject(Store), ɵɵinject(Actions), ɵɵinject(NGXS_WEBSOCKET_OPTIONS));
};
WebSocketHandler.ɵprov = ɵɵdefineInjectable({
  token: WebSocketHandler,
  factory: WebSocketHandler.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WebSocketHandler, [{
    type: Injectable
  }], function() {
    return [{
      type: Store
    }, {
      type: Actions
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [NGXS_WEBSOCKET_OPTIONS]
      }]
    }];
  }, null);
})();
function websocketOptionsFactory(options) {
  return Object.assign({
    reconnectInterval: 5e3,
    reconnectAttempts: 10,
    typeKey: "type",
    deserializer(e) {
      return JSON.parse(e.data);
    },
    serializer(value) {
      return JSON.stringify(value);
    }
  }, options);
}
var USER_OPTIONS = new InjectionToken("USER_OPTIONS");
var NgxsWebsocketPluginModule = class _NgxsWebsocketPluginModule {
  static forRoot(options) {
    return {
      ngModule: _NgxsWebsocketPluginModule,
      providers: [WebSocketHandler, {
        provide: USER_OPTIONS,
        useValue: options
      }, {
        provide: NGXS_WEBSOCKET_OPTIONS,
        useFactory: websocketOptionsFactory,
        deps: [USER_OPTIONS]
      }, {
        provide: APP_INITIALIZER,
        useFactory: noop,
        deps: [WebSocketHandler],
        multi: true
      }]
    };
  }
};
NgxsWebsocketPluginModule.ɵfac = function NgxsWebsocketPluginModule_Factory(t) {
  return new (t || NgxsWebsocketPluginModule)();
};
NgxsWebsocketPluginModule.ɵmod = ɵɵdefineNgModule({
  type: NgxsWebsocketPluginModule
});
NgxsWebsocketPluginModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsWebsocketPluginModule, [{
    type: NgModule
  }], null, null);
})();
export {
  ConnectWebSocket,
  DisconnectWebSocket,
  NGXS_WEBSOCKET_OPTIONS,
  NgxsWebsocketPluginModule,
  SendWebSocketMessage,
  WebSocketConnected,
  WebSocketConnectionUpdated,
  WebSocketDisconnected,
  WebsocketMessageError
};
//# sourceMappingURL=@ngxs_websocket-plugin.js.map
