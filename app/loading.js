export default function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-danger">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Yükleniyor...</span>
            </div>
        </div>
    )
}