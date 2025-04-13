import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductInWishlist {
  product_id: number;
  wishlist_id: number;
}

interface Wishlist {
  id: number;
  title: string;
  products: ProductInWishlist[];
}

const wishListApiUrl = "http://127.0.0.1:5000/wishlists";

export default function WishlistPage() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [newListName, setNewListName] = useState("");
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [editListId, setEditListId] = useState<number | null>(null);
  const [editListName, setEditListName] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => {
    getProducts();
    getWishlists();
  }, []);

  useEffect(() => {
    !!selectedListId && getWishlistProducts(selectedListId);
  }, [selectedListId]);

  const getProducts = () => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
    });
  };

  const getWishlists = () => {
    axios.get(wishListApiUrl).then((res) => {
      const wishLists = res.data.map((list: any) => ({
        id: list.id,
        title: list.title,
        active: list.active || true,
      }));
      setWishlists(wishLists);
    });
  };

  const getWishlistProducts = (id: number) => {
    axios.get(`${wishListApiUrl}/${id}/products`).then((res) => {
      setWishlists((prev) =>
        prev.map((list) =>
          list.id === id ? { ...list, products: res.data } : list
        )
      );
    });
  };

  const handleCreateWishlist = () => {
    const newList: Omit<Wishlist, "id"> = {
      title: newListName,
      products: [],
    };

    axios.post(`${wishListApiUrl}`, newList).then((res) => {
      setWishlists((prev) => [...prev, res.data]);
      setNewListName("");
    });
  };

  const handleUpdateWishlistTitle = () => {
    if (editListId === null) return;
    axios
      .put(`${wishListApiUrl}/${editListId}`, { title: editListName })
      .then((res) => {
        console.log(res.data);
        setWishlists((prev) =>
          prev.map((list) =>
            list.id === editListId ? { ...list, title: editListName } : list
          )
        );
        setEditListId(null);
        setEditListName("");
      });
  };

  const handleRemoveWishlist = (id: number) => {
    axios.delete(`${wishListApiUrl}/${id}`).then((res) => {
      setWishlists((prev) => prev.filter((list) => list.id !== id));
      setConfirmDeleteId(null);
    });
  };

  const handleAddProductToWishlist = (
    listId: number,
    product: ProductInWishlist
  ) => {
    axios.post(`${wishListApiUrl}/${listId}/products`, product).then((res) => {
      setWishlists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                products: [...(list.products || []), res.data],
              }
            : list
        )
      );
    });
  };

  const handleRemoveProductFromWishlist = (
    listId: number,
    productId: number
  ) => {
    axios
      .delete(`${wishListApiUrl}/${listId}/products/${productId}`)
      .then((res) => {
        setWishlists((prev) =>
          prev.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  products: list.products.filter(
                    (p) => p.product_id !== productId
                  ),
                }
              : list
          )
        );
      });
  };

  const isProductInWishlist = (listId: number, productId: number) => {
    const list = wishlists?.find((l) => l.id === listId);
    return list?.products?.some((p) => p.product_id === productId);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Minhas Listas de Desejos</h1>

      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Nome da nova lista"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleCreateWishlist}>
          Criar Lista
        </button>
      </div>

      <div className="row g-3">
        {wishlists.map((list) => (
          <div className="col-md-6" key={list.id}>
            <div
              className={`card ${
                selectedListId === list.id ? "border-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedListId(list.id)}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <strong>{list.title}</strong>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => {
                      setEditListId(list.id);
                      setEditListName(list.title);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setConfirmDeleteId(list.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedListId !== null && (
        <div className="mt-5">
          <h2 className="mb-3">Produtos</h2>
          <div className="row g-4">
            {products.map((product) => {
              const inList = isProductInWishlist(selectedListId, product.id);
              return (
                <div className="col-sm-6 col-md-3" key={product.id}>
                  <div className="card h-100 text-center p-2">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <p className="card-title small">{product.title}</p>
                      <button
                        className={`btn btn-sm w-100 ${
                          inList ? "btn-danger" : "btn-outline-primary"
                        }`}
                        onClick={() =>
                          inList
                            ? handleRemoveProductFromWishlist(
                                selectedListId,
                                product.id
                              )
                            : handleAddProductToWishlist(selectedListId, {
                                product_id: product.id,
                                wishlist_id: selectedListId,
                              })
                        }
                      >
                        {inList ? "Remover" : "Adicionar"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal Editar Lista */}
      {editListId !== null && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Lista</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditListId(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={editListName}
                  onChange={(e) => setEditListName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditListId(null)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateWishlistTitle}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Desativação */}
      {confirmDeleteId !== null && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Alteração</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setConfirmDeleteId(null)}
                ></button>
              </div>
              <div className="modal-body">
                Tem certeza que deseja remover esta lista?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveWishlist(confirmDeleteId)}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
