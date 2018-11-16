// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
function updateList(name: any, montant: any) {
    const products: any = document.getElementById("products")
    products.innerHTML += `
      <div class="item col-4">
        <div class="thumbnail card">
          <div class="img-event">
            <img class="group list-group-image img-fluid" src="images/silhouette-user.jpg" alt="" />
          </div>
          <div class="caption card-body">
            <h4 class="group card-title inner list-group-item-heading">
            ${name}</h4>
            <div class="row">
              <div class="col-xs-12 col-md-6">
                <p class="lead">
                  FCFA <span>${montant}</span></p>
              </div>
              <div class="col-xs-12 col-md-6">
                <a class="btn btn-success" href="http://www.jquery2dotnet.com">Détails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
}
const members = require('electron').remote.getGlobal('sharedObject').members  
/*let targetProxy: any = new Proxy(members, {
    set: function (target: any, key: string, value: string) {
        console.log(`${key} set to ${value}`);
        target[key] = value;
        return true;
    }
});*/