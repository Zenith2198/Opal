import { FieldErrors } from "react-hook-form/dist/types/errors";
import InfoButton from "@/components/tourmalineForm/InfoButton";
import ErrorMessage from "@/components/tourmalineForm/ErrorMessage";
import DualTextField from "@/components/tourmalineForm/DualTextField";

export default function DenoiseMethodTab({ register, errors, selectedDenoiseMethod}: {
	register: any,
	errors: FieldErrors<any>,
	selectedDenoiseMethod: "DADA2 paired-end" | "DADA2 single-end" | "Deblur single-end"
}) {
	//Function to render appropriate fields depending on denoiseMethod
	function renderDenoiseFields() {
		switch(selectedDenoiseMethod){
			case 'DADA2 paired-end':
				return (
					<>
						<DualTextField
        					register1={register}
        					register2={register}
        					errors={errors}
        					name1="dada2pe_trunc_len_f"
        					label1="Forward Truncation Length"
        					infoButton1={<InfoButton infoText="Position at which forward read sequences should be truncated..." />}
        					name2="dada2pe_trunc_len_r"
        					label2="Reverse Truncation Length"
        					infoButton2={<InfoButton infoText="Position at which reverse read sequences should be truncated..." />}
        					ErrorMessageComponent={ErrorMessage}
      					/>

						<div className="space-y-4 p-1">
							<div className="flex gap-x-4">
								<label className="form-control w-1/2 max-w-xs relative">
									<div className="label pb-0">
										<span className="label-text">Forward Read 5' Trimming Position</span>
										<span className="label-text-alt">
											<InfoButton infoText="Position at which forward read sequences should be trimmed due to low quality. This trims the 5' end of the input sequences, which will be the bases that were sequenced in the first cycles."/>
										</span>
									</div>
									<div className="relative w-full">
										<input {...register('dada2pe_trim_left_f')} className={`input input-bordered w-full pr-8 ${errors.dada2pe_trim_left_f ? 'input-error' : ''}`}/>
										<ErrorMessage errors={errors} name='dada2pe_trim_left_f'/>
									</div>
								</label>

								<label className="form-control w-1/2 max-w-xs relative">
									<div className="label pb-0">
										<span className="label-text">Reverse Read 5' Trimming Position</span>
										<span className="label-text-alt">
											<InfoButton infoText="Position at which reverse read sequences should be trimmed due to low quality. This trims the 5' end of the input sequences, which will be the bases that were sequenced in the first cycles."/>
										</span>
									</div>
									<div className="relative w-full">
										<input {...register('dada2pe_trim_left_r')} className={`input input-bordered w-full pr-8 ${errors.dada2pe_trim_left_r ? 'input-error' : ''}`}/>
										<ErrorMessage errors={errors} name='dada2pe_trim_left_r'/>
									</div>
								</label>
							</div>
						</div>

						<div className="space-y-4 p-1">
							<div className="flex gap-x-4">
								<label className="form-control w-1/2 max-w-xs relative">
									<div className="label pb-0">
										<span className="label-text">Forward Max Expected Errors</span>
										<span className="label-text-alt">
											<InfoButton infoText="Forward reads with number of expected errors higher than this value will be discarded."/>
										</span>
									</div>
									<div className="relative w-full">
										<input {...register('dada2pe_max_ee_f')} className={`input input-bordered w-full pr-8 ${errors.dada2pe_max_ee_f ? 'input-error' : ''}`}/>
										<ErrorMessage errors={errors} name='dada2pe_max_ee_f'/>
									</div>
								</label>

								<label className="form-control w-1/2 max-w-xs relative">
									<div className="label pb-0">
										<span className="label-text">Reverse Max Expected Errors</span>
										<span className="label-text-alt">
											<InfoButton infoText="Reverse reads with number of expected errors higher than this value will be discarded."/>
										</span>
									</div>
									<div className="relative w-full">
										<input {...register('dada2pe_max_ee_r')} className={`input input-bordered w-full pr-8 ${errors.dada2pe_max_ee_r ? 'input-error' : ''}`}/>
										<ErrorMessage errors={errors} name='dada2pe_max_ee_r'/>
									</div>
								</label>
							</div>
						</div>

						<div className="space-y-4 p-1">
							<div className="flex gap-x-4">
								<label className="form-control relative max-w-xs">
									<div className="label pb-0">
										<span className="label-text">Truncation Quality Threshold</span>
										<span className="label-text-alt">
											<InfoButton infoText="Reads are truncated at the first instance of a quality score less than or equal to this value. If the resulting read is then shorter than `trunc-len-f` or `trunc-len-r` (depending on the direction of the read) it is discarded."/>
										</span>
									</div>
									<div className="relative">
										<input {...register('dada2pe_trunc_q')} className={`input input-bordered w-full pr-8 ${errors.dada2pe_trunc_q ? 'input-error' : ''}`}/>
										<ErrorMessage errors={errors} name='dada2pe_trunc_q'/>
									</div>
								</label>
							</div>
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control w-relative max-w-xs">
								<div className="label pb-0">
									<span className="label-text">Pooling Method</span>
									<span className="label-text-alt">
										<InfoButton infoText="The method used to pool samples for denoising. 'independent': Samples are denoised indpendently. 'pseudo': The pseudo-pooling method is used to approximate pooling of samples. In short, samples are denoised independently once, ASVs detected in at least 2 samples are recorded, and samples are denoised independently a second time, but this time with prior knowledge of the recorded ASVs and thus higher sensitivity to those ASVs."/>
									</span>
								</div>
								<select {...register('dada2pe_pooling_method')} className={`select select-bordered w-full ${errors.dada2pe_pooling_method && "select-error"}`}>
									<option disabled value="">Select Pooling Method</option>
									<option value="independent">Independent</option>
									<option value="pseudo">Pseudo</option>
								</select>
							</label>
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control relative max-w-xs">
								<div className="label pb-0">
									<span className="label-text">Chimera Method</span>
									<span className="label-text-alt">
										<InfoButton infoText="The method used to remove chimeras. 'none': No chimera removal is performed. 'pooled': All reads are pooled prior to chimera detection. 'consensus': Chimeras are detected in samples individually, and sequences found chimeric in a sufficient fraction of samples are removed."/>
									</span>
								</div>
								<select {...register('dada2pe_chimera_method')} className={`select select-bordered w-full ${errors.dada2pe_pooling_method && "select-error"}`}>
									<option disabled value="">Select Chimera Method</option>
									<option value="consensus">Consensus</option>
									<option value="none">None</option>
									<option value="pooled">Pooled</option>
								</select>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Minimum Fold Parent Over Abundance</span>
									<span className="label-text-alt">
										<InfoButton infoText="The minimum abundance of potential parents of a sequence being tested as chimeric, expressed as a fold-change versus the abundance of the sequence being tested. Values should be greater than or equal to 1 (i.e. parents should be more abundant than the sequence being tested). This parameter has no effect if chimera-method is 'none'."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('dada2pe_min_fold_parent_over_abundance')} className={`input input-bordered w-full pr-8 ${errors.dada2pe_min_fold_parent_over_abundance ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='dada2pe_min_fold_parent_over_abundance'/>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1 flex items-center">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Number of Reads to Learn</span>
									<span className="label-text-alt">
										<InfoButton infoText="The number of reads to use when training the error model. Smaller numbers will result in a shorter run time but a less reliable error model."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('dada2pe_n_reads_learn')} className={`input input-bordered w-full pr-8 ${errors.dada2pe_n_reads_learn ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='dada2pe_n_reads_learn'/>
								</div>
							</label>
						</div>
					</>
				);

			case 'DADA2 single-end':
				return (
					<>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Truncation Length</span>
									<span className="label-text-alt">
										<InfoButton infoText="Position at which sequences should be truncated due to decrease in quality. This truncates the 3' end of the of the input sequences, which will be the bases that were sequenced in the last cycles. Reads that are shorter than this value will be discarded. If 0 is provided, no truncation or length filtering will be performed."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('dada2se_trunc_len')} className={`input input-bordered w-full pr-8 ${errors.dada2se_trunc_len ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='dada2se_trunc_len'/>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Trim Left</span>
									<span className="label-text-alt">
										<InfoButton infoText="Position at which sequences should be trimmed due to low quality. This trims the 5' end of the of the input sequences, which will be the bases that were sequenced in the first cycles."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('dada2se_trim_left')} className={`input input-bordered w-full pr-8 ${errors.dada2se_trim_left ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='dada2se_trim_left'/>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Max Expected Errors</span>
									<span className="label-text-alt">
										<InfoButton infoText="Reads with number of expected errors higher than this value will be discarded."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('dada2se_max_ee')} className={`input input-bordered w-full pr-8 ${errors.dada2se_max_ee ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='dada2se_max_ee'/>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Truncation Quality Threshold</span>
									<span className="label-text-alt">
										<InfoButton infoText="Reads are truncated at the first instance of a quality score less than or equal to this value. If the resulting read is then shorter than 'Truncation Length', it is discarded."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('dada2se_trunc_q')} className={`input input-bordered w-full pr-8 ${errors.dada2se_trunc_q ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='dada2se_trunc_q'/>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control relative max-w-xs">
								<div className="label pb-0">
									<span className="label-text">Pooling Method</span>
									<span className="label-text-alt">
										<InfoButton infoText="The method used to pool samples for denoising. 'independent': Samples are denoised independently. 'pseudo': The pseudo-pooling method is used to approximate pooling of samples. In short, samples are denoised independently once, ASVs detected in at least 2 samples are recorded, and samples are denoised independently a second time, but this time with prior knowledge of the recorded ASVs and thus higher sensitivity to those ASVs."/>
									</span>
								</div>
								<select {...register('dada2se_pooling_method')} className={`select select-bordered w-full ${errors.dada2se_pooling_method && "select-error"}`}>
										<option disabled value="">Select Pooling Method</option>
										<option value="independent">Independent</option>
										<option value="pseudo">Pseudo</option>
									</select>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control relative max-w-xs">
								<div className="label pb-0">
									<span className="label-text">Chimera Method</span>
									<span className="label-text-alt">
										<InfoButton infoText="The method used to remove chimeras. 'none': No chimera removal is performed. 'pooled': All reads are pooled prior to chimera detection. 'consensus': Chimeras are detected in samples individually, and sequences found chimeric in a sufficient fraction of samples are removed."/>
									</span>
								</div>
								<select {...register('dada2se_chimera_method')} className={`select select-bordered w-full ${errors.dada2se_chimera_method && "select-error"}`}>
										<option disabled value="">Select Chimera Method</option>
										<option value="consensus">Consensus</option>
										<option value="none">None</option>
										<option value="pooled">Pooled</option>
									</select>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Minimum Fold Parent Over Abundance</span>
									<span className="label-text-alt">
										<InfoButton infoText="The minimum abundance of potential parents of a sequence being tested as chimeric, expressed as a fold-change versus the abundance of the sequence being tested. Values should be greater than or equal to 1 (i.e. parents should be more abundant than the sequence being tested). This parameter has no effect if chimera-method is 'none'."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('dada2se_min_fold_parent_over_abundance')} className={`input input-bordered w-full pr-8 ${errors.dada2se_min_fold_parent_over_abundance ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='dada2se_min_fold_parent_over_abundance'/>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Number of Reads to Learn</span>
									<span className="label-text-alt">
										<InfoButton infoText="The number of reads to use when training the error model. Smaller numbers will result in a shorter run time but a less reliable error model."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('dada2se_n_reads_learn')} className={`input input-bordered w-full pr-8 ${errors.dada2se_n_reads_learn ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='dada2se_n_reads_learn'/>
								</div>
							</label>
						</div>
					</>
				);

			case 'Deblur single-end':
				return (
					<>
						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Trim Length</span>
									<span className="label-text-alt">
										<InfoButton infoText="Sequence trim length, specify -1 to disable trimming."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('deblur_trim_length')} className={`input input-bordered w-full pr-8 ${errors.deblur_trim_length ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='deblur_trim_length'/>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Mean Error</span>
									<span className="label-text-alt">
										<InfoButton infoText="The mean per nucleotide error, used for original sequence estimate."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('deblur_mean_error')} className={`input input-bordered w-full pr-8 ${errors.deblur_mean_error ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='deblur_mean_error'/>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Indel Probability</span>
									<span className="label-text-alt">
										<InfoButton infoText="Insertion/deletion (indel) probability (same for N indels)."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('deblur_indel_prob')} className={`input input-bordered w-full pr-8 ${errors.deblur_indel_prob ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='deblur_indel_prob'/>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Indel Max</span>
									<span className="label-text-alt">
										<InfoButton infoText="Maximum number of insertion/deletions."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('deblur_indel_max')} className={`input input-bordered w-full pr-8 ${errors.deblur_indel_max ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='deblur_indel_max'/>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Minimum Reads</span>
									<span className="label-text-alt">
										<InfoButton infoText="Retain only features appearing at least min-reads times across all samples in the resulting feature table."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('deblur_min_reads')} className={`input input-bordered w-full pr-8 ${errors.deblur_min_reads ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='deblur_min_reads'/>
								</div>
							</label>
						</div>

						<div className="space-y-4 p-1">
							<label className="form-control max-w-xs relative">
								<div className="label pb-0">
									<span className="label-text">Minimum Size</span>
									<span className="label-text-alt">
										<InfoButton infoText="In each sample, discard all features with an abundance less than min-size."/>
									</span>
								</div>
								<div className="relative w-full">
									<input {...register('deblur_min_size')} className={`input input-bordered w-full pr-8 ${errors.deblur_min_size ? 'input-error' : ''}`}/>
									<ErrorMessage errors={errors} name='deblur_min_size'/>
								</div>
							</label>
						</div>
					</>
				);

			default:
				return null;
		}
	}

	return (
		<div>
			<select
				{...register('denoiseMethod')}
				// className="appearance-none bg-white border border-gray-300 w-full py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				className={`select w-full max-w-xs ${errors.denoiseMethod && "select-error"}`}
			>
				<option value="DADA2 paired-end">DADA2 paired-end</option>
				<option value="DADA2 single-end">DADA2 single-end</option>
				<option value="Deblur single-end">Deblur single-end</option>
			</select>

			{/* Conditionally render fields based on denoiseMethod */}
			{renderDenoiseFields()}

			<div className="label">
				<span className="label-text-alt"></span>
				<span className="label-text-alt text-red-500">
					{errors.denoiseMethod && "Please select a denoise method"}
				</span>
			</div>
		</div>
	);
};