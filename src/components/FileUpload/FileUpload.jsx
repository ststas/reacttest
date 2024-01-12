import './FileUpload.scss';

export default function FileUpload() {
	return (
		<div className="file">
			<label className="file-label" htmlFor="upload">
				<input className="file-input" type="file" name="resume" />
				<span className="file-upload-container">
					<span className="file-upload-label">Загрузить фото</span>
					<span className="file-icon">
						<i className="fas fa-upload" />
					</span>
				</span>
			</label>
		</div>
	);
}
