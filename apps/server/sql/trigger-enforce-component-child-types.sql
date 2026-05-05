CREATE OR REPLACE TRIGGER enforce_component_child_types
BEFORE INSERT OR UPDATE ON component_data 
FOR EACH ROW 
EXECUTE FUNCTION enforce_component_child_types();