import PCA from "./PCABO.js";

	const AGNES = {
        clusterize: async() => {
            let cluster = require('ml-hclust');
            var elements = (await  PCA.getPCAData());
            console.log(elements);
            return cluster.agnes(elements,'complete');
        }
	}
export default AGNES;