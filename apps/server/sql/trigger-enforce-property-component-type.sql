CREATE OR REPLACE TRIGGER enforce_property_component_type
BEFORE INSERT OR UPDATE ON property_data
FOR EACH ROW 
EXECUTE FUNCTION enforce_base_component_type('property');