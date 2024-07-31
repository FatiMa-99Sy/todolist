class Tache extends React.Component {
    handleModifier = () => {
      this.props.onModifier(this.props.id);
    };
  
    handleSupprimer = () => {
      this.props.onSupprimer(this.props.id);
    };
  
    render() {
      const { texte } = this.props;
  
      return (
        <div className="tache bg-white border-bottom shadow m-3 p-3 d-flex align-items-center justify-content-between">
          {texte}
          <div>
            <button
              className="btn btn-outline-primary me-2"
              onClick={this.handleModifier}
            >
              Modifier
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={this.handleSupprimer}
            >
              Supprimer
            </button>
          </div>
        </div>
      );
    }
  }
  
  class Application extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        taches: [],
        nouvelleTache: '',
        idTacheEnEdition: null,
      };
    }
  
    handleAjouterTache = (e) => {
      e.preventDefault();
      const { nouvelleTache, taches, idTacheEnEdition } = this.state;
      if (nouvelleTache.trim() !== '') {
        if (idTacheEnEdition === null) {
          this.setState({
            taches: [...taches, { id: Date.now(), texte: nouvelleTache }],
            nouvelleTache: '',
          });
        } else {
          this.setState({
            taches: taches.map((tache) =>
              tache.id === idTacheEnEdition
                ? { ...tache, texte: nouvelleTache }
                : tache
            ),
            nouvelleTache: '',
            idTacheEnEdition: null,
          });
        }
      } else {
        alert('Veuillez indiquer la tâche');
      }
    };
  
    handleChangementInput = (e) => {
      this.setState({ nouvelleTache: e.target.value });
    };
  
    handleEditerTache = (id) => {
      const tacheAEditer = this.state.taches.find((tache) => tache.id === id);
      this.setState({
        nouvelleTache: tacheAEditer.texte,
        idTacheEnEdition: id,
      });
    };
  
    handleSupprimerTache = (id) => {
      this.setState({
        taches: this.state.taches.filter((tache) => tache.id !== id),
      });
    };
  
    render() {
      const { taches, nouvelleTache, idTacheEnEdition } = this.state;
  
      return (
        <div className="container-fluid d-flex justify-content-center pt-5">
          <div className="col-md-6">
            <h1 className="fw-bold fs-3 text-center">Liste des Tâches</h1>
            <form
              onSubmit={this.handleAjouterTache}
              className="d-flex justify-content-center align-items-center gap-3"
            >
              <input
                type="text"
                value={nouvelleTache}
                onChange={this.handleChangementInput}
                className="border-2 p-3 w-75"
                placeholder="Ajouter ou modifier une tâche..."
              />
              <button
                type="submit"
                className="btn btn-dark w-25 border-none rounded text-white p-3"
              >
                {idTacheEnEdition === null ? 'Ajouter' : 'Modifier'}
              </button>
            </form>
            <div className="mt-4">
              {taches.map((tache) => (
                <Tache
                  key={tache.id}
                  id={tache.id}
                  texte={tache.texte}
                  onModifier={this.handleEditerTache}
                  onSupprimer={this.handleSupprimerTache}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(<Application />, document.getElementById('root'));