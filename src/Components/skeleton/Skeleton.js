import './styles.css'

export function SkeletonCard() {
    return (
        <div className='skeleton-content'>
            <div className="card-skeleton-container">
                <div className="link-div-skeleton">
                    <div className="title-container">
                        <div className="top-card-skeleton">
                            <div className="icon-skaleton skeleton"></div>
                            <div className="trash-skeleton skeleton"></div>
                        </div>
                        <div className="title-skeleton skeleton"></div>
                    </div>
                
                    <div className="desc-link-area-skeleton">
                        <div className="desc-skeleton skeleton"></div>
                        <div className="link-skeleton skeleton"></div>
                    </div>
                    <div className="button-skeleton skeleton"></div>
                </div>
            </div>
        </div>
    )
}

function Skeleton() {
    return (
        <div className='skeleton-container'>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    )
}

export default Skeleton