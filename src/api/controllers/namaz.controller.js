const logger = require('../../config/logger');
const namazService = require('../services/namazService');

exports.getNamazTimings = async (req, res, next) => {
 
  try {
    const requestUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    const { page, size, search } = req.query;
    const result = await namazService.getNamazTimings({ page, size, search ,requestUrl });
    return res.json(result);
  } catch (error) {
    logger.error('Error fetching Categories:', error);
    return next(error);
  }
};


exports.createNamazTiming = async (req, res, next) => {
  console.log('Add namaz')
  try {
    const { namaz_name, namaz_time
    } = req.body;

    if (!namaz_name || !namaz_time)  {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name , time are required.',
      });
    }

    const result = await namazService.createNamazTiming({ namaz_name, namaz_time});
    return res.status(201).json({
      success: true,
      message: 'Namaz Timing created successfully',
      data: result,
    });

  } catch (error) {
    logger.error(`Error creating Namaz Timing: ${error.message}`);
    return next(error);
  }
};

exports.updateNamazTiming = async (req, res, next) => {
  try {
    console.log('req.body',req.body);
    const { id } = req.params;
    const { namaz_name , namaz_time } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Namaz ID is required.',
      });
    }

    if (!namaz_name || !namaz_time) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name , time are required.',
      });
    }

    const result = await namazService.updateNamazTiming({ id, namaz_name , namaz_time });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Namaz timing not found or update failed.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Namaz timing updated successfully.',
    });

  } catch (error) {
    logger.error(`Error updating Namaz timing: ${error.message}`);
    return next(error);
  }
};

exports.deleteNamazTiming = async (req, res, next) => {
 
  try {
    const { id } = req.params;
    const result = await namazService.deleteNamazTiming(id);
    return res.json(result);
  } catch (error) {
    logger.error('Error deleting Namaz timing:', error);
    return next(error);
  }
};

