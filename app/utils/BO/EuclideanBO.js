import Amostras from "../DB/DAO/AmostraDAO";
import Normalizador from "./NormalizerBO";

const { euclidean, squaredEuclidean} = require('ml-distance-euclidean');

const utils = {
			RDPToArray: (arrayNumber) => {
				arrayNumber = arrayNumber .map(a => {
					let result = []
					Object.keys(a).forEach(key => {
						result.push(a[key])
					})
					return result
				})
				return arrayNumber;
			},
			mergeSort :(arr) => {
			if (arr.length === 1) {
			  return arr
			}
			const middle = Math.floor(arr.length / 2)
			const left = arr.slice(0, middle)
			const right = arr.slice(middle) 
			return utils.merge(
			  utils.mergeSort(left),
			  utils.mergeSort(right)
			)
		  },
		  merge :(left, right) => {
			let result = []
			let indexLeft = 0
			let indexRight = 0
			while (indexLeft < left.length && indexRight < right.length) {
			  if (left[indexLeft][0][1] < right[indexRight][0][1]) {
				result.push(left[indexLeft])
				indexLeft++
			  } else {
				result.push(right[indexRight])
				indexRight++
			  }
			}
			return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
		  }
		}
	const Euclidean = {
        getDistance: (point1,point2) => {
            return euclidean(point1,point2);
        },
         getDistanceUsingID: async(id1,id2) =>{
            let amostra1 = (await Amostras.getBytId(id1));
			let amostra2 = (await Amostras.getBytId(id2));
			amostra1 = utils.RDPToArray(amostra1);
			amostra2 = utils.RDPToArray(amostra2);
			return (euclidean(amostra1[0],amostra2[0]));
		},
		getAllCorrelation: async(amostraEscolhida) =>{
			let allIds = await Amostras.getIdsData();
			let dictionary = Array();
			allIds = utils.RDPToArray(allIds);
			let normalized = (await Normalizador.normalize());
			for(let i = 0 ; i< allIds.length;i++){	
				dictionary[i] = Array()			
				let distance = euclidean(normalized[amostraEscolhida],normalized[allIds[i][0]])
				let maxDistance = Math.sqrt(661);
				let aux = distance * 100;
				let result = aux / maxDistance;
				result = Math.abs(result - 100);
				dictionary[i].push([allIds[i][0],result]);
			}
			return utils.mergeSort(dictionary).reverse();
		},
		getAllCorrelationByPercentual: async(amostraEscolhida,percentual) =>{
			let allCorrelation = (await Euclidean.getAllCorrelation(amostraEscolhida) );
			let allCorrFiltred = Array();
				for(let i = 0; i < allCorrelation.length; i++)
					if(allCorrelation[i][0][1] >= percentual)
						allCorrFiltred.push(allCorrelation[i][0])
			return allCorrFiltred
		},
		getAllCorrelationByQuantity: async(amostraEscolhida,quantity) =>{
			let allCorrelation = (await Euclidean.getAllCorrelation(amostraEscolhida) );
			return allCorrelation.slice(0,quantity)
		}
		
	}
export default Euclidean;