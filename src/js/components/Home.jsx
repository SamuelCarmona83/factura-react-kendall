import { useState } from "react";

const FormInput = (props) => {
	return <div className="mb-3">
		<label className="form-label">{props.label}</label>
		<input
			type={(props.type ? props.type : "text")}
			className="form-control"
			value={props.state}
			onChange={(evt) => props.setState(evt.target.value)}
		/>
	</div>
}

const Home = () => {

	const [nombreCliente, setNombreCliente] = useState('');

	const [numeroFactura, setNumeroFactura] = useState('');
	const [fecha, setFecha] = useState('');
	const [datosBancarios, setDatosBancarios] = useState('');

	// TODO: Listar campos dinamicos
	const camposDelCliente = [
		'nombreCliente',
		'numeroFactura',
		'fecha',
		'datosBancarios'
	]

	let productosIniciales = [
		{ id: 1, nombre: '', precio: "" },
		{ id: 2, nombre: '', precio: "" },
		{ id: 3, nombre: '', precio: "" }
	];

	const [productos, setProductos] = useState(productosIniciales);

	const newProduct = (newId) => {
		return { id: newId, nombre: "", precio: "" }
	}

	const actualizarProducto = (idBuscado, campo, valor) => {


		const nuevosProductos = productos.map(item => {
			if (item.id == idBuscado) {

				let itemConNuevoDato = { ...item, [campo]: valor }

				return itemConNuevoDato;
			}
			return item
		});

		setProductos(nuevosProductos);
	};

	const [mostrarFactura, setMostrarFactura] = useState(false);

	const manejarEnvio = (evt) => {
		evt.preventDefault();
		setMostrarFactura(true)
	}

	return (
		<div className="container mt-5">
			<h1 className="text-center mb-4">
				Generador de Facturas en React!
			</h1>
			<div className="container mt-5" style={{ maxWidth: '700px' }}>
				<form onSubmit={manejarEnvio} className="card p-4 shadow">
					<h2 className="mb-4">Datos del CLiente</h2>

					<FormInput label={"Nombre del Cliente:"} state={nombreCliente} setState={setNombreCliente} />

					<FormInput label={"Numero de Factura:"} state={numeroFactura} setState={setNumeroFactura} />

					<FormInput label={"Fecha:"} state={fecha} setState={setFecha} type="date" />

					<FormInput label={"Datos Bancarios"} state={datosBancarios} setState={setDatosBancarios} />

					<h2 className=" mt-4 mb-2">Productos</h2>
					<div className="mt-4 mb-3">
						{productos.map((producto) => {
							return <div key={producto.id} className="row mb-3">
								<div className="col-md-8">
									<input
										type="text"
										className="form-control"
										placeholder="Nombre"
										value={producto.nombre}
										onChange={(evt) => actualizarProducto(producto.id, 'nombre', evt.target.value)}
									/>
								</div>
								<div className="col-md-4">
									<input
										type="text"
										className="form-control"
										placeholder="Precio"
										value={producto.precio}
										onChange={(evt) => actualizarProducto(producto.id, 'precio', evt.target.value)}
									/>
								</div>
							</div>
						}
						)}

						<button className="btn btn-success"
							onClick={() => setProductos([
								newProduct(productos.length + 1),
								...productos
							])}
						>
							Agregar producto
						</button>

					</div>

					{mostrarFactura && (
						<div className="factura">
							<h3>Factura Nº {numeroFactura}</h3>
							<p><strong>Cliente:</strong> {nombreCliente}</p>
							<p><strong>Fecha:</strong> {fecha}</p>
							<hr />
							<h5 className="mt-3">Productos:</h5>
							<table className="table table-sm">
								<tbody>
									{productos
										.filter((p) => p.nombre !== '')
										.map((producto) => (
											<tr key={producto.id}>
												<td>{producto.nombre}</td>
												<td className="text-end">
													${parseFloat(producto.precio || 0).toFixed(2)}
												</td>
											</tr>
										))}
								</tbody>
							</table>
							{(() => {
								const subtotal = productos.reduce(
									(suma, p) => suma + parseFloat(p.precio || 0),
									0
								);
								const iva = subtotal * 0.19;
								const total = subtotal + iva;

								return (
									<div className="mt-4 p-3 bg-light rounded">
										<div className="row text-end">
											<div className="col-md-8"><strong>Subtotal:</strong></div>
											<div className="col-md-4">${subtotal.toFixed(2)}</div>
										</div>
										<div className="row text-end">
											<div className="col-md-8"><strong>IVA (19%):</strong></div>
											<div className="col-md-4">${iva.toFixed(2)}</div>
										</div>
										<div className="row text-end border-top pt-2 mt-2">
											<div className="col-md-8"><h5>TOTAL:</h5></div>
											<div className="col-md-4"><h5 className="text-primary">${total.toFixed(2)}</h5></div>
										</div>
										<p className="mt-3"><strong>Datos Bancarios:</strong> {datosBancarios}</p>
									</div>
								);
							})()}

						</div>
					)}
					<button type="submit" className="btn btn-primary">Generar Factura</button>
				</form>
				<button
					className="btn btn-danger m-3"
					onClick={() => setMostrarFactura(false)}
				>Eliminar</button>
			</div>

		</div>
	);
};

export default Home;