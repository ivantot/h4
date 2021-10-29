import React from "react";

export const makeFetchList = (WrappedComponent, url) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        names: [],
        loading: true,
      };
    }

    componentDidMount() {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            names: data.body.authors,
            loading: false,
          });
        });
    }

    reload = () => {
      this.setState({
        loading: true,
      });
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            names: data.body.authors,
            loading: false,
          });
        });
    };

    delete = (id) => {
      this.setState((state, props) => {
        return {
          names: state.names.filter((n) => n.id !== id),
        };
      });
    };

    render() {
      return (
        <WrappedComponent
          list={this.state.names}
          onDelete={this.delete}
          onReload={this.reload}
          loading={this.state.loading}
          {...this.props}
        />
      );
    }
  };
};

const TableItem = ({ ime, onDelete }) => {
  return (
    <tr>
      <td>{ime}</td>
      <td>
        <button onClick={onDelete}>DEL</button>
      </td>
    </tr>
  );
};

export const ListComponent = ({ list, onDelete, onReload, loading }) => {
  if (loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div>
      <table>
        <tbody>
          {list.map((item) => {
            return (
              <TableItem
                key={item.id}
                onDelete={() => onDelete(item.id)}
                ime={item.ime}
              />
            );
          })}
        </tbody>
      </table>
      <button onClick={() => onReload()}>Reload</button>
    </div>
  );
};

class NameTable2 extends React.Component {
  constructor(props) {
    super(props);
    this.tag = makeFetchList(ListComponent, "http://localhost:3081/app/books");
  }
  render() {
    let MyTag = this.tag;
    return <MyTag />;
  }
}

export default NameTable2;
