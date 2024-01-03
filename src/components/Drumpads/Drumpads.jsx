/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import './Drumpads.scss';
import { useState } from 'react';
import useSound from 'use-sound';
import BD909 from './Sounds/909/BD.WAV';
import CL909 from './Sounds/909/CLAP.WAV';
import CH909 from './Sounds/909/CH.WAV';
import OH909 from './Sounds/909/OH.WAV';
import BD808 from './Sounds/808/BD.WAV';
import SD808 from './Sounds/808/SD.WAV';
import CH808 from './Sounds/808/CH.WAV';
import OH808 from './Sounds/808/OH.WAV';

export default function Drumpads() {
	const [drums, setDrums] = useState('TR-909');
	const BD = drums === 'TR-909' ? BD909 : BD808;
	const CLSD = drums === 'TR-909' ? CL909 : SD808;
	const CH = drums === 'TR-909' ? CH909 : CH808;
	const OH = drums === 'TR-909' ? OH909 : OH808;
	const [playBD] = useSound(BD, { volume: 1 });
	const [playClap] = useSound(CLSD, { volume: 0.75 });
	const [playCH] = useSound(CH, { volume: 0.75 });
	const [playOH] = useSound(OH, { volume: 0.75 });

	function drumsSelector() {
		return drums === 'TR-909' ? setDrums('TR-808') : setDrums('TR-909');
	}
	return (
		<section className="drumpads">
			<header className="header">
				<label htmlFor="drummachines" className="label">
					Choose Your Drums
					<select
						id="drummachines"
						name="drummachines"
						className="selector"
						onChange={drumsSelector}
					>
						<option value="tr-909">TR-909</option>
						<option value="tr-808">TR-808</option>
					</select>
				</label>
			</header>
			<section className="pads">
				<button className="pad" onTouchStart={playBD}>
					BD
				</button>
				<button className="pad" onTouchStart={playClap}>
					{drums === 'TR-909' ? 'CLAP' : 'SD'}
				</button>
				<button className="pad" onTouchStart={playOH}>
					OH
				</button>
				<button className="pad" onTouchStart={playCH}>
					CH
				</button>
			</section>
		</section>
	);
}
